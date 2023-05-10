export class TwitterService {
    register = (email: string, name: string): string => "TwitterAccountId"
    authenticate = (email: string, password: string): string => "ATwitterAccountId"
    tweet = (token: string, message: string): string => "TweetUrl"
}
