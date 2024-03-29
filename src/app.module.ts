import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { ResponseService } from './general/response/response.service';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [PrismaModule, AdminUsersModule, GeneralModule],
  providers: [AppService],
})
export class AppModule {

}
