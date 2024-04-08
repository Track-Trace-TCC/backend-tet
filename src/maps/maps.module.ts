import { Module } from '@nestjs/common';
import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js';
import { DirectionsService } from './directions/directions.service';
@Module({
    providers: [DirectionsService, {
        provide: GoogleMapsClient,
        useValue: new GoogleMapsClient(),
    }],
    exports: [DirectionsService],
})
export class MapsModule {
}
