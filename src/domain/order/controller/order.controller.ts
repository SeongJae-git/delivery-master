import { Controller, UseGuards } from '@nestjs/common';
import { JWTAccessGuard } from 'src/middleware/auth/guard/auth.jwt.access';

@UseGuards(JWTAccessGuard)
@Controller('/order')
export class OrderClass {}
