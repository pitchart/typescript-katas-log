import {UserService} from "./user.service";
import {TwitterService} from "./twitter.service";
import {BusinessLogger} from "./business.logger";
import {None, Option, Some} from "funfix-core";
import {User} from "./user";

class RegistrationContext {
    accountId: string;
    twitterToken: string;
    tweetUrl: string;

    constructor(public readonly user: User) {

    }

}

export class AccountService {
    private _userService: UserService;
    private _twitterService: TwitterService;
    private _businessLogger: BusinessLogger;

    constructor(userService: UserService, twitterService: TwitterService, businessLogger: BusinessLogger) {
        this._userService = userService;
        this._twitterService = twitterService;
        this._businessLogger = businessLogger;
    }

    register = (id: string): Option<string> => {
        try {

            const process = Option.of(this._userService.findById(id))
                .chain((user) => {
                        const ctx = new RegistrationContext(user);
                        ctx.accountId = this._twitterService.register(user.email, user.name);
                        if (ctx.accountId == null) {
                            return None;
                        } else {
                            return Some(ctx);
                        }
                    }
                ).chain((ctx) => {
                    ctx.twitterToken = this._twitterService.authenticate(ctx.user.email, ctx.user.password);
                    if (ctx.twitterToken == null) {
                        return None;
                    } else {
                        return Some(ctx);
                    }
                })
                .chain((ctx) => {
                    ctx.tweetUrl = this._twitterService.tweet(ctx.twitterToken, "Hello I am " + ctx.user.name);
                    if (ctx.tweetUrl == null) {
                        return None;
                    } else {
                        return Some(ctx);
                    }
                }).map((ctx) => {
                    this._userService.updateTwitterAccountId(ctx.user.id, ctx.accountId);
                    this._businessLogger.logRegisterSuccess(ctx.user.id);
                    return ctx.tweetUrl;
                });
            return process;
        } catch (ex) {
            this._businessLogger.logRegisterFailure(id, ex);
            return None;
        }
    }

}
