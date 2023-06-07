import { UserService } from './user.service'
import { TwitterService } from './twitter.service'
import { BusinessLogger } from './business.logger'
import { None, Option } from 'funfix-core'
import { User } from './user'

class RegistrationContext {
  accountId: string
  twitterToken: string
  tweetUrl: string

  constructor (public readonly user: User) {

  }
}

export class AccountService {
  private readonly _userService: UserService
  private readonly _twitterService: TwitterService
  private readonly _businessLogger: BusinessLogger

  constructor (userService: UserService, twitterService: TwitterService, businessLogger: BusinessLogger) {
    this._userService = userService
    this._twitterService = twitterService
    this._businessLogger = businessLogger
  }

  register = (id: string): Option<string> => {
    try {
      return Option.of(this._userService.findById(id))
        .chain((user) => this.registerAccount(user))
        .chain((ctx) => this.authenticateUser(ctx))
        .chain((ctx) => this.tweetAsUser(ctx))
        .map((ctx) => this.updateTwitterAccountIdAndLogRegisterSuccess(ctx))
    } catch (ex) {
      this._businessLogger.logRegisterFailure(id, ex)
      return None
    }
  }

  private updateTwitterAccountIdAndLogRegisterSuccess (ctx: RegistrationContext): string {
    this._userService.updateTwitterAccountId(ctx.user.id, ctx.accountId)
    this._businessLogger.logRegisterSuccess(ctx.user.id)
    return ctx.tweetUrl
  }

  private tweetAsUser (ctx: RegistrationContext): Option<RegistrationContext> {
    return Option.of(this._twitterService.tweet(ctx.twitterToken, 'Hello I am ' + ctx.user.name))
      .map((tweetUrl) => {
        ctx.tweetUrl = tweetUrl
        return ctx
      })
  }

  private authenticateUser (ctx: RegistrationContext): Option<RegistrationContext> {
    return Option.of(this._twitterService.authenticate(ctx.user.email, ctx.user.password))
      .map((twitterToken) => {
        ctx.twitterToken = twitterToken
        return ctx
      })
  }

  private registerAccount (user: User): Option<RegistrationContext> {
    return Option.of(this._twitterService.register(user.email, user.name))
      .map((accountId) => {
        const ctx = new RegistrationContext(user)
        ctx.accountId = accountId
        return ctx
      })
  }
}
