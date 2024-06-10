import mongoose, { Document } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";


export async function createUser(input: Pick<UserDocument, 'email' | 'name' | 'password'>) {
    try {
        return await UserModel.create(input);
    } catch (error) {
        throw error;
    }
}
