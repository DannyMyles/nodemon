export interface IAuthSession {
    authId: number;
    userId: number;
    loginTime: Date;
    logoutTime: Date;
}

export class AuthSessionModel implements IAuthSession {
    constructor(
        public authId: number = 0,
        public userId: number = 0,
        public loginTime: Date = new Date(),
        public logoutTime: Date = new Date(),
    ) {}
}
