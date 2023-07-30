import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';
import { Public } from '@/utils/decorators/public.decorator';

@Public()
@Controller('auth/google')
export class GoogleOauthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    return;
  }

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.getToken(req.user);
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    Logger.log(accessToken);

    return { accessToken };
  }
}
