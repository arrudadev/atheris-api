import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { validate } from './env'
import { PrismaService } from './prisma/prisma.service'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate,
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}
