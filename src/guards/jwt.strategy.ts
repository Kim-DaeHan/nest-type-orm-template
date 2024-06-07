import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: any) {
    return {
      userId: payload.id,
      name: payload.name,
      isAdmin: payload.isAdmin,
      isSuperAdmin: payload.isSuperAdmin,
      canIssueToken: payload.canIssueToken,
      canTransferToken: payload.canTransferToken,
      canManageSettings: payload.canManageSettings,
      canManageFaq: payload.canManageFaq,
      canManageAccounts: payload.canManageAccounts,
    };
  }
}
