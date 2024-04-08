import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { MapsModule } from 'src/maps/maps.module';
import { RoutesGateway } from './routes-gateway/routes-gateway.gateway';
import { BullModule } from '@nestjs/bull';
import { NewPointsJob } from './new-points.job';
import { DriversModule } from 'src/drivers/drivers.module';

@Module({
  imports: [
    MapsModule,
    BullModule.registerQueue({ name: 'new-points' }),
    DriversModule
  ],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    RoutesGateway,
    NewPointsJob
  ],
})
export class RoutesModule { }
