import { UserService } from '../src/account/user.service'
import { TwitterService } from '../src/account/twitter.service'
import { BusinessLogger } from '../src/account/business.logger'
import { AccountService } from '../src/account/account.service'

const accountService = new AccountService(new UserService(), new TwitterService(), new BusinessLogger())

describe('Account', () => {
  test('register Bud Spencer should provide a new tweet url', () => {
    const tweetUrl = accountService.register('1')

    expect(tweetUrl.get()).toBe('TweetUrl')
  })

  test('register an unknown user should provide nothing', () => {
    const tweetUrl = accountService.register('unknown')

    expect(tweetUrl.getOrElse(null)).toBeNull()
  })
})
