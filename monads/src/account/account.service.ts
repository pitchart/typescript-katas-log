import { UserService } from './user.service'
import { TwitterService } from './twitter.service'
import { BusinessLogger } from './business.logger'
import { Option } from 'funfix-core'
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

  register = (id: string): string | null => {
    try {
      return Option.of(this._userService.findById(id))
        .map(user => new RegisterContext(user))
        .flatMap(this.registerOnTwitter)
        .flatMap(this.authenticateOnTwitter)
        .flatMap(this.tweet)
        .map(context => {
          this._userService.updateTwitterAccountId(id, context.accountId)
          this._businessLogger.logRegisterSuccess(id)

          return context.tweetUrl
        }).getOrElse(null)
    } catch (ex) {
      this._businessLogger.logRegisterFailure(id, ex)
      return null
    }
  }

  private readonly tweet = (context: RegisterContext): Option<RegisterContext> =>
    Option.of(this._twitterService.tweet(context.twitterToken, 'Hello I am ' + context.user.name))
      .map(tweetUrl => context.withTweetUrl(tweetUrl))

  private readonly authenticateOnTwitter = (context: RegisterContext): Option<RegisterContext> =>
    Option.of(this._twitterService.authenticate(context.user.email, context.user.password))
      .map(twitterToken => context.withTwitterToken(twitterToken))

  private readonly registerOnTwitter = (context: RegisterContext): Option<RegisterContext> =>
    Option.of(this._twitterService.register(context.user.email, context.user.name))
      .map(accountId => context.withAcountId(accountId))
}
