import User from '../db/entities/userEntity';
import { UserModel } from '../core/models/userModel';

export default class UserService {
    public async createUser(data: Omit<UserModel, 'id'>): Promise<User | void> {
        try {
            const newUser = await User.create({
                roleId: data.roleId,
                fullname: data.fullname,
                lastname: data.lastname,
                email: data.email,
                birthdate: data.birthdate,
                gender: data.gender,
                username: data.username,
                password: data.password,
            });
            return this.findUserByUsername(newUser.username);
        } catch (err) {
            throw new Error(err);
        }
    }

    public async findUserByUsername(username: string): Promise<User | void> {
        try {
            return User.findOne({
                where: { username },
                include: ['role'],
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}
