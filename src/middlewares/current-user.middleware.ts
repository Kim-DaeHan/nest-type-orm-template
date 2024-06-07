// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { AdminService } from 'src/modules/admin/admin.service';
// import { Admin } from 'src/modules/admin/entity/admin.entity';
//
// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: Admin;
//     }
//   }
// }
//
// @Injectable()
// export class CurrentUserMiddleware implements NestMiddleware {
//   constructor(private adminService: AdminService) {}
//
//   async use(req: Request, res: Response, next: NextFunction) {
//     //@ts-ignore
//     const { userId } = req.session || {};
//
//     if (userId) {
//       const user = await this.adminService.findOne(userId);
//       req.currentUser = user;
//     }
//
//     next();
//   }
// }
