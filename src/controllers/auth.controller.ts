import { Request, Response } from 'express';
import UserService from '../services/user.service';
import JwtService from '../services/jwt.service';
import { UserModel } from '../core/models/userModel';
import RoleService from '../services/role.service';
import { ROLE_TYPES } from '../utils/constants';

const roleService = new RoleService();
const jwtService = new JwtService();
const userService = new UserService();

export default class AuthController {
    public async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await userService.findUserByUsername(username);

            if (user) {
                const isPasswordMatch = user.validatePassword(password);

                if (!isPasswordMatch) {
                    return res.status(401).send({
                        code: 401,
                        message: 'Invalid user data!',
                    });
                } else {
                    const accessToken = jwtService.generateAccessToken(
                        user.id,
                        user.username,
                        user['role'].role,
                        user.password,
                    );
                    const data = new UserModel(
                        user.id,
                        user.fullname,
                        user.lastname,
                        user.email,
                        user.birthdate,
                        user.gender,
                        user.username,
                        user.password,
                        accessToken,
                        user.roleId,
                        user['role'].role,
                    );

                    return res.status(200).send({
                        code: 200,
                        success: true,
                        message: 'User logged in successfully!',
                        data,
                    });
                }
            } else {
                return res.status(404).send({
                    code: 404,
                    message: 'User not found!',
                });
            }
        } catch (err) {
            return res.sendStatus(500);
        }
    }

    public async signup(req: Request, res: Response) {
        try {
            const {
                fullname,
                lastname,
                email,
                birthdate,
                gender,
                username,
                password,
            } = req.body;

            const role = req.body.role ? req.body.role : ROLE_TYPES.USER;

            if (
                !(
                    fullname &&
                    lastname &&
                    email &&
                    birthdate &&
                    gender &&
                    username &&
                    password
                )
            ) {
                return res.status(400).send({
                    code: 400,
                    message: 'Invalid user data!',
                });
            }

            const userExists = await userService.findUserByUsername(username);
            if (userExists) {
                return res.status(409).send({
                    code: 409,
                    message: 'User already exists!',
                });
            }

            const userRole = await roleService.getOneRole(role);
            if (!userRole) {
                return res.status(404).send({
                    code: 404,
                    message: 'Role not found!!!',
                });
            }
            if (userRole.role === ROLE_TYPES.ADMIN && userRole.count > 1) {
                return res.status(400).send({
                    code: 400,
                    message: "Bad request!!! Can't be more than 2 admins!",
                });
            }

            req.body.roleId = userRole.roleId;
            const user = await userService.createUser(req.body);
            if (user) {
                const accessToken = jwtService.generateAccessToken(
                    user.id,
                    user.username,
                    user['role'].role,
                    user.email,
                );
                const data = new UserModel(
                    user.id,
                    user.fullname,
                    user.lastname,
                    user.email,
                    user.birthdate,
                    user.gender,
                    user.username,
                    user.password,
                    accessToken,
                    user.roleId,
                    user['role'].role,
                );
                await roleService.updateRoleCount(role);

                return res.status(201).send({
                    code: 201,
                    success: true,
                    message: 'User created successfully!',
                    data,
                });
            }
        } catch (err) {
            return res.sendStatus(500);
        }
    }
}
