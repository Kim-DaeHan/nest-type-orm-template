// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { ResponseDto } from 'src/modules/user/dto/response-user.dto';
// import { RequestDto } from 'src/modules/user/dto/request-user.dto';
// import { UserModule } from 'src/modules/user/user.module';
// import { UserService } from 'src/modules/user/user.service';

// class MockUserService {
//   getEventParticipantsList(): ResponseDto {
//     return {
//       count: 1,
//       rows: [
//         {
//           userId: 'USER_I',
//           isAgree: true,
//           balance: '608900',
//           createdAt: 1704067213,
//         },
//       ],
//     };
//   }
// }

// describe('User', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [UserModule],
//     })
//       .overrideProvider(UserService)
//       .useValue(new MockUserService())
//       .compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/user/agreements (GET)', () => {
//     const queryParameters: RequestDto = {
//       timestamp: 1704067201,
//       balance: '300000',
//       userId: null,
//       limit: 5,
//       offset: 0,
//     };

//     const expectedResult: ResponseDto = {
//       count: 1,
//       rows: [
//         {
//           userId: 'USER_I',
//           isAgree: true,
//           balance: '608900',
//           createdAt: 1704067213,
//         },
//       ],
//     };

//     return request(app.getHttpServer())
//       .get('/user/agreements')
//       .query(queryParameters)
//       .expect(200)
//       .expect((response) => {
//         expect(response.body).toBeDefined();
//         expect(response.body).toEqual(expectedResult);
//       });
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });
