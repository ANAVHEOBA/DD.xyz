import { User } from './auth.model';
import { IUser, IUserDocument, IRegistrationData, ILoginCredentials } from './auth.types';

export class AuthCrud {
    static async createUser(userData: IRegistrationData): Promise<IUserDocument> {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            throw new Error(`Error creating user: ${error}`);
        }
    }

    static async findUserByEmail(email: string): Promise<IUserDocument | null> {
        try {
            return await User.findOne({ email }).exec();
        } catch (error) {
            throw new Error(`Error finding user: ${error}`);
        }
    }

    static async findUserById(id: string): Promise<IUserDocument | null> {
        try {
            return await User.findById(id).select('-password').exec();
        } catch (error) {
            throw new Error(`Error finding user: ${error}`);
        }
    }

    static async validateCredentials(credentials: ILoginCredentials): Promise<IUserDocument | null> {
        try {
            const user = await User.findOne({ email: credentials.email }).exec();
            if (!user) return null;

            const isValid = await user.comparePassword(credentials.password);
            return isValid ? user : null;
        } catch (error) {
            throw new Error(`Error validating credentials: ${error}`);
        }
    }

    static async updateUser(id: string, updateData: Partial<IUser>): Promise<IUserDocument | null> {
        try {
            // Prevent password update through this method
            delete updateData.password;
            
            return await User.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true, runValidators: true }
            ).select('-password').exec();
        } catch (error) {
            throw new Error(`Error updating user: ${error}`);
        }
    }

    static async deleteUser(id: string): Promise<boolean> {
        try {
            const result = await User.findByIdAndDelete(id).exec();
            return !!result;
        } catch (error) {
            throw new Error(`Error deleting user: ${error}`);
        }
    }
} 