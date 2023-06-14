import { UserService } from './user.service'
import { TwitterService } from './twitter.service'
import { BusinessLogger } from './business.logger'
import { Option } from 'funfix-core'
import { User } from './user'

class RegisterContext {
  accountId: string

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
      const user = Option.of(this._userService.findById(id))
        .map(user => new RegisterContext(user))

      const accountId = user.flatMap(context => {
        return Option.of(this._twitterService.register(context.user.email, context.user.name))
          .map(accountId => context.withAcountId(accountId))
      })

      if (accountId.isEmpty()) return null

      const twitterToken = this._twitterService.authenticate(
        user.get().email,
        user.get().password
      )

      if (twitterToken == null) return null

      const tweetUrl = this._twitterService.tweet(
        twitterToken,
        'Hello I am ' + user.get().name
      )

      if (tweetUrl == null) return null

      this._userService.updateTwitterAccountId(id, accountId.get())
      this._businessLogger.logRegisterSuccess(id)

      return tweetUrl
    } catch (ex) {
      this._businessLogger.logRegisterFailure(id, ex)
      return null
    }
  }
}
