import {UserService} from "./user.service";
import {TwitterService} from "./twitter.service";
import {BusinessLogger} from "./business.logger";

export class AccountService {
    private _userService: UserService;
    private _twitterService: TwitterService;
    private _businessLogger: BusinessLogger;

    constructor(userService: UserService, twitterService: TwitterService, businessLogger: BusinessLogger) {
        this._userService = userService;
        this._twitterService = twitterService;
        this._businessLogger = businessLogger;
    }

    register = (id: string): string | null => {
        try {
            const user = this._userService.findById(id);

            if (user == null) return null;

            const accountId = this._twitterService.register(user.email, user.name);

            if (accountId == null) return null;

            const twitterToken = this._twitterService.authenticate(user.email, user.password);

            if (twitterToken == null) return null;

            const tweetUrl = this._twitterService.tweet(twitterToken, "Hello I am " + user.name);

            if (tweetUrl == null) return null;

            this._userService.updateTwitterAccountId(id, accountId);
            this._businessLogger.logRegisterSuccess(id);

            return tweetUrl;
        } catch (ex) {
            this._businessLogger.logRegisterFailure(id, ex);
            return null;
        }
    }

}
