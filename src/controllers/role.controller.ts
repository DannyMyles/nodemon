import { Request, Response } from 'express';
import RoleService from '../services/role.service';

const roleService = new RoleService();

export default class RoleController {
    public async createRole(req: Request, res: Response) {
        try {
            const role = await roleService.createRole(req.body);

            return res.status(201).send({
                code: 201,
                success: true,
                message: 'Role created successfully!',
                data: role,
            });
        } catch (err) {
            return res.sendStatus(500);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const roles = await roleService.getAll();

            return res.status(200).send({
                code: 200,
                success: true,
                message: 'Got all roles!',
                data: roles,
            });
        } catch (err) {
            return res.status(400).send({
                code: 400,
                message: 'Roles not found!',
            });
        }
    }

    public async getRoleById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const role = await roleService.getRoleById(Number(id));

            return res.status(200).send({
                code: 200,
                success: true,
                message: 'Got the role!',
                data: role,
            });
        } catch (err) {
            return res.status(400).send({
                code: 400,
                message: 'Role not found!',
            });
        }
    }
}
