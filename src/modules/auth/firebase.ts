import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from 'src/../vn-parking-47125-firebase-adminsdk-xkt70-ba98dc1791.json';

export const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
