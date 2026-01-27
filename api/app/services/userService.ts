import User from "#models/user";
import { CreateUserDTO } from "../dto/userDTO.js";

export default class UserService {
    public async create(data: CreateUserDTO) {
        return User.create(data)
    }
}