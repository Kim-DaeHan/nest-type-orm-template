import type { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';

export const ormConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const option = {
      type: configService.get('DB_TYPE'),
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      synchronize: false, //TODO: edit to true later
      entities: ['dist/**/*.entity{.ts,.js}'],
    };

    return option;
  },
};
