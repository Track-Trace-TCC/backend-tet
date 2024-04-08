import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { ResponseService } from './general/response/response.service';
import { GeneralModule } from './general/general.module';
import { CustomersModule } from './customers/customers.module';
import { DriversModule } from './drivers/drivers.module';
import { PackageModule } from './package/package.module';
import { RoutesModule } from './routes/routes.module';
import { MapsModule } from './maps/maps.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, AdminUsersModule, GeneralModule, CustomersModule, DriversModule, PackageModule, RoutesModule, MapsModule, ConfigModule.forRoot({ isGlobal: true }),],
  providers: [AppService],
})
export class AppModule {

}
