export class BusinessLogger {
    logRegisterFailure = (id: string, error: Error): void => {
        console.log("We failed to register the user: " + id)
        console.log("Here is why: " + error.message)
        console.log("Stack trace: " + error.stack)
    }

    logRegisterSuccess = (id: string): void => {
        console.log("We successfully registered the user : " + id)
    }
}
