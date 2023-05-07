import { dataSource } from '@/database/database.service';
import { AuthService } from './auth.service';
import { app } from './firebase';
import { BadRequestException } from '@nestjs/common';

describe('auth service testing', () => {
    let authService: AuthService;

    describe('create user method', () => {
        beforeEach(async () => {
            const dataSourceInstance = await dataSource.useFactory();
            authService = new AuthService(app, dataSourceInstance);
        });
        test('user already existed', async () => {
            try {
                await authService.createUser({
                    token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGjDumMgTmd1eeG7hW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS0yN0VHN3pFX3JaSjRWb0xTN09Wb3BBMU04T0VEM1BMR0dwZFo9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdm4tcGFya2luZy00NzEyNSIsImF1ZCI6InZuLXBhcmtpbmctNDcxMjUiLCJhdXRoX3RpbWUiOjE2ODMyMzIxMDAsInVzZXJfaWQiOiJrNUU4MmZVY25SVWViaU1OVXFOZmpoNUhiNXoyIiwic3ViIjoiazVFODJmVWNuUlVlYmlNTlVxTmZqaDVIYjV6MiIsImlhdCI6MTY4MzMxNjM1MSwiZXhwIjoxNjgzMzE5OTUxLCJlbWFpbCI6Im1ydm50ZWNoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA2MDM2MDkyNDk4MDAzMjIyMTIxIl0sImVtYWlsIjpbIm1ydm50ZWNoQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.J_cFPlnYkcK0LOelON9HVxL2knUztgiMezt8v5PVBSEEohVv47y5b0ekGfrKOvTK7wWDn9CMxny2jxyp_6f1isBUnh4J_2EdvQN3N5fKIegtlwVyCkEc72Kx8dOiAbt_53gKGNBOy3Q_rV9WE_6j26W8rcb7Lan0Vu96owjzYmpild_2nnRHTpS_XmGhev8raTlTK1Khvl1inmMoyV2dBorkKjGklnFiRMnr5gWVBNl1idh9mZy2MpdIIa6SDnFeUAYKEufO5kUeUFoS71QxmY3DCdelnVOl5J6wZ5fhnMUaMy0CgJhCSMs5k-cy9zA3-mnJ6ZijJjP1t5Ms9luerg',
                    role: 1,
                });
            } catch (error) {
                console.log(error);

                expect(error).toMatchObject(new BadRequestException());
            }
        });

        test('user not existed', async () => {
            expect(
                await authService.createUser({
                    token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoicGh1YyBxdWFuZyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhZYzBQZTB3WmJaQ0dOdVdYS056c3V2SWNPZ1NoZzY5bnhkQTFhST1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS92bi1wYXJraW5nLTQ3MTI1IiwiYXVkIjoidm4tcGFya2luZy00NzEyNSIsImF1dGhfdGltZSI6MTY4MzMxODAxNiwidXNlcl9pZCI6IldUSHU1T0d4ZmhRYTdVQzNEUnYwRXMzZGdPYzIiLCJzdWIiOiJXVEh1NU9HeGZoUWE3VUMzRFJ2MEVzM2RnT2MyIiwiaWF0IjoxNjgzMzE4MDE2LCJleHAiOjE2ODMzMjE2MTYsImVtYWlsIjoicXVhbmdwaHVjdHF2cEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMjkyNDU2MjQ5NDQ0OTcwNTYzNSJdLCJlbWFpbCI6WyJxdWFuZ3BodWN0cXZwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.Udnt6RtzKC9RdSVFqv_tncnjsstCp7cIq1j82NZXs4ZLUPt05NRQgRLWUrymfzesgqO7PMs1VbTqHjYqPeLk-bI4PDXaMbbd1a_GuNsoIt_cbDEznjiVTB96cWJx19uab9Nb9EcD9TcoFDx2xlLCoCGx8lpg260hwKw2mdtuZ_lE8QzkRIlr8A7pLtfzPtt2yhvrz2PREgTUFUS7cYkYRcN0RnB_pG_M2zF5Htb08wiyxoKQRQFV4DYbW814qe6GTmFOD3z6V4GcN1Usi8uhg5x0KqbBGEPvIhv7CUc6t3m6w1WEs8ZbE7wBPBLaVJACpUrDtPwT4NJYW4WKTpWu5Q',
                    role: 1,
                }),
            ).toBe(true);
        });
    });

    describe('check token method', () => {
        test('invalid token', async () => {
            expect(
                await authService.checkToken(
                    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGjDumMgTmd1eeG7hW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS0yN0VHN3pFX3JaSjRWb0xTN09Wb3BBMU04T0VEM1BMR0dwZFo9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdm4tcGFya2luZy00NzEyNSIsImF1ZCI6InZuLXBhcmtpbmctNDcxMjUiLCJhdXRoX3RpbWUiOjE2ODI2MjI4NzQsInVzZXJfaWQiOiJrNUU4MmZVY25SVWViaU1OVXFOZmpoNUhiNXoyIiwic3ViIjoiazVFODJmVWNuUlVlYmlNTlVxTmZqaDVIYjV6MiIsImlhdCI6MTY4Mjk3NTgyNywiZXhwIjoxNjgyOTc5NDI3LCJlbWFpbCI6Im1ydm50ZWNoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA2MDM2MDkyNDk4MDAzMjIyMTIxIl0sImVtYWlsIjpbIm1ydm50ZWNoQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.YDjhGKIbLm8uirQIbeKUG_bvYg2sQI0rAFMNliaTZIt-Y7g8C5P-YcCOClNS5ZD6w-n0ng4Ewd-sBaIdePaeJeh3BQ86_4HHtb5LsumofbcVt8KPAngHHLeQP0VvZChLNWlH1IM7PIiVpMeJ4y9jzBjF9AS-AsWPXDdZ0GXX38ecqLPeUTcv5H8xT4RiWIyldRZRPAtOdXTgcrFSQRV9vVclXkaFanQQXNQKBrKooxaSIdpKfbYG1uopWttbxbp1dGmWNbDuByyGg_XU6eOAt4S2LhWhxh_d2cs6y3lN05NE2Vypn57Ba7rqCPVuLQgq-Moix8IfpVR5RqziItVelA',
                ),
            ).toBe(false);
        });
        test('valid token', async () => {
            const decodedIdToken = await authService.checkToken(
                'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGjDumMgTmd1eeG7hW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS0yN0VHN3pFX3JaSjRWb0xTN09Wb3BBMU04T0VEM1BMR0dwZFo9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdm4tcGFya2luZy00NzEyNSIsImF1ZCI6InZuLXBhcmtpbmctNDcxMjUiLCJhdXRoX3RpbWUiOjE2ODMyMzIxMDAsInVzZXJfaWQiOiJrNUU4MmZVY25SVWViaU1OVXFOZmpoNUhiNXoyIiwic3ViIjoiazVFODJmVWNuUlVlYmlNTlVxTmZqaDVIYjV6MiIsImlhdCI6MTY4MzMxNjM1MSwiZXhwIjoxNjgzMzE5OTUxLCJlbWFpbCI6Im1ydm50ZWNoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA2MDM2MDkyNDk4MDAzMjIyMTIxIl0sImVtYWlsIjpbIm1ydm50ZWNoQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.J_cFPlnYkcK0LOelON9HVxL2knUztgiMezt8v5PVBSEEohVv47y5b0ekGfrKOvTK7wWDn9CMxny2jxyp_6f1isBUnh4J_2EdvQN3N5fKIegtlwVyCkEc72Kx8dOiAbt_53gKGNBOy3Q_rV9WE_6j26W8rcb7Lan0Vu96owjzYmpild_2nnRHTpS_XmGhev8raTlTK1Khvl1inmMoyV2dBorkKjGklnFiRMnr5gWVBNl1idh9mZy2MpdIIa6SDnFeUAYKEufO5kUeUFoS71QxmY3DCdelnVOl5J6wZ5fhnMUaMy0CgJhCSMs5k-cy9zA3-mnJ6ZijJjP1t5Ms9luerg',
            );
            expect(!decodedIdToken).toBe(false);
        });
    });
});
