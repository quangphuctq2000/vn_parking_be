import { Injectable } from '@nestjs/common';
import serviceAccount from 'src/../vn-parking-47125-firebase-adminsdk-xkt70-ba98dc1791.json';
import admin, { ServiceAccount } from 'firebase-admin';
import { App, initializeApp } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthService {
    app: App;
    constructor() {
        this.app = initializeApp({
            credential: admin.credential.cert(serviceAccount as ServiceAccount),
        });
    }

    async checkToken(idToken: string): Promise<DecodedIdToken | false> {
        try {
            const decodedIdToken = await getAuth(this.app).verifyIdToken(
                idToken,
            );
            console.log(decodedIdToken);

            return decodedIdToken;
        } catch (error) {
            console.log('error', error);

            return false;
        }
    }
}
