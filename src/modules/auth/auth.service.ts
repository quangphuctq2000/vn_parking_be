import { Injectable } from '@nestjs/common';
import serviceAccount from './../../../project-9f526-firebase-adminsdk-kzbop-7b87b3db21.json';
import admin, { ServiceAccount } from 'firebase-admin';
import { App, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthService {
  app: App;
  constructor() {
    this.app = initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  }

  async checkToken(idToken: string): Promise<string | false> {
    try {
      const decodedIdToken = await getAuth(this.app).verifyIdToken(idToken);
      return decodedIdToken.uid;
    } catch (error) {
      return false;
    }
  }
}
