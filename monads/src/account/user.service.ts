import { User } from './user';

export class UserService {
    private readonly repository: Map<string, User> = new Map<string, User>([
        ["1", new User('1', 'bud.spencer@gmail.com', 'Bud Spencer', 'OJljaefp0')],
        ["2", new User('1', "terrence.hill@gmail.com", "Terrence Hill", "àu__udsv09Ll")]
    ]);

    findById = (id: string): User => this.repository.has(id) ? this.repository.get(id) : null

    updateTwitterAccountId = (id: string, twitterAccountId: string): void => {
        console.log(this.findById(id).name)
    }
}
