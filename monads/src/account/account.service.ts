import { UserService } from './user.service'
import { TwitterService } from './twitter.service'
import { BusinessLogger } from './business.logger'
import { Either, Option, Try } from 'funfix-core'
import { User } from './user'

class RegisterContext {
  accountId: string
  twitterToken: string
  tweetUrl: string

  withTweetUrl (tweetUrl: string): RegisterContext {
    this.tweetUrl = tweetUrl
    return this
  }

  withTwitterToken (twitterToken: string): RegisterContext {
    this.twitterToken = twitterToken
    return this
  }

  withAcountId (accountId: string): RegisterContext {
    this.accountId = accountId
    return this
  }

  user: User
  constructor (user: User) {
    this.user = user
  }
}
export class AccountService {
  private readonly _userService: UserService
  private readonly _twitterService: TwitterService
  private readonly _businessLogger: BusinessLogger

  constructor (
    userService: UserService,
    twitterService: TwitterService,
    businessLogger: BusinessLogger
  ) {
    this._userService = userService
    this._twitterService = twitterService
    this._businessLogger = businessLogger
  }

  register = (id: string): Either<Error, string> => {
    return Try.of(() => Option.of(this._userService.findById(id)).getOrElseL(() => {
      throw new Error('user not found')
    }))
      .map(user => new RegisterContext(user))
      .flatMap(this.registerOnTwitter)
      .map((context) => {
        this._userService.updateTwitterAccountId(id, context.accountId)
        return context
      })
      .flatMap(this.authenticateOnTwitter)
      .flatMap(this.tweet)
      .fold((ex: Error) => {
        this._businessLogger.logRegisterFailure(id, ex)
        return Either.left(ex)
      }, (context: RegisterContext) => {
        this._businessLogger.logRegisterSuccess(id)
        return Either.right(context.tweetUrl)
      })
  }

  private readonly tweet = (context: RegisterContext): Try<RegisterContext> =>
    Try.of(() => Option.of(this._twitterService.tweet(context.twitterToken, 'Hello I am ' + context.user.name))
      .map(tweetUrl => context.withTweetUrl(tweetUrl)).getOrElseL(() => {
        throw new Error('error on tweet')
      }))

  private readonly authenticateOnTwitter = (context: RegisterContext): Try<RegisterContext> =>
    Try.of(() => Option.of(this._twitterService.authenticate(context.user.email, context.user.password))
      .map(twitterToken => context.withTwitterToken(twitterToken)).getOrElseL(() => {
        throw new Error('error on authentication')
      }))

  private readonly registerOnTwitter = (context: RegisterContext): Try<RegisterContext> =>
    Try.of(() => Option.of(this._twitterService.register(context.user.email, context.user.name))
      .map(accountId => context.withAcountId(accountId)).getOrElseL(() => {
        throw new Error('error on registration')
      }))
}
