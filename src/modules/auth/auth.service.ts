import {
    Injectable,
    Inject,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';

import { App } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { DataSource } from 'typeorm';
import {
    AuthWithGoogleData,
    CreateUserData,
    LoginData,
    UpdateUserEmailPasswordData,
    UpdateUserInfoData,
} from './auth.dto';
import { User } from '@/database/models/users';
import { coppyObjectWithoutNullProperty } from '@/ultis/coppyFunction';

@Injectable()
export class AuthService {
    constructor(
        @Inject('APP') private app: App,
        private dataSource: DataSource,
    ) {}

    async checkToken(idToken: string): Promise<DecodedIdToken | false> {
        try {
            const decodedIdToken = await getAuth(this.app).verifyIdToken(
                idToken,
            );
            return decodedIdToken;
        } catch (error) {
            return false;
        }
    }

    async createUser(data: CreateUserData) {
        return await this.dataSource.transaction(
            async (entityTransactionManager) => {
                try {
                    const decodedIdToken = await this.checkToken(data.token);
                    if (!decodedIdToken)
                        throw new UnauthorizedException('invalid token');
                    const existedUser = await entityTransactionManager.findOne(
                        User,
                        {
                            where: {
                                email: decodedIdToken.email,
                            },
                        },
                    );
                    if (existedUser) throw new BadRequestException();
                    await entityTransactionManager.save(User, {
                        id: decodedIdToken.uid,
                        email: decodedIdToken.email,
                        role: data.role,
                    });
                } catch (error) {
                    throw error;
                }
            },
        );
    }

    async login(loginData: LoginData) {
        try {
            const decodedIdToken = await this.checkToken(loginData.token);
            if (!decodedIdToken)
                throw new UnauthorizedException('invalid token');
            const existingUser = await this.dataSource
                .getRepository(User)
                .findOne({
                    where: {
                        email: decodedIdToken.email,
                    },
                });
            if (!existingUser) throw new BadRequestException();
        } catch (error) {
            throw error;
        }
    }

    async authWithGoogle(AuthWithGoogleData: AuthWithGoogleData) {
        try {
            const decodedIdToken = await this.checkToken(
                AuthWithGoogleData.token,
            );
            if (!decodedIdToken)
                throw new UnauthorizedException('invalid token');
            await this.dataSource.transaction(
                async (entityTransactionManager) => {
                    try {
                        await entityTransactionManager.save(User, {
                            id: decodedIdToken.uid,
                            role: AuthWithGoogleData.role,
                            email: decodedIdToken.email,
                        });
                    } catch (error) {
                        throw error;
                    }
                },
            );
        } catch (error) {
            throw error;
        }
    }

    async updateUserInfo(data: UpdateUserInfoData) {
        const { userId, ...userInfo } = data;
        const updateUserInfo = coppyObjectWithoutNullProperty(userInfo);
        try {
            await getAuth().updateUser(userId, updateUserInfo);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    async updateEmailPassword(data: UpdateUserEmailPasswordData) {
        const { userId, ...userEmailPassword } = data;
        const updateUserEmailPassword =
            coppyObjectWithoutNullProperty(userEmailPassword);
        try {
            await getAuth().updateUser(userId, updateUserEmailPassword);
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
