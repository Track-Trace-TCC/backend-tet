import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DirectionsRequest, Client as GoogleMapsClient, LatLng, TravelMode } from '@googlemaps/google-maps-services-js';
import { CreateRouteDto } from 'src/routes/dto/create-route.dto';
import { haversineDistance } from 'src/general/utils/utils';
@Injectable()
export class DirectionsService {
    constructor(
        private googleMapsClient: GoogleMapsClient,
        private configService: ConfigService,
    ) { }

    async getDirections(createRouteDto: CreateRouteDto) {
        const origin = `${createRouteDto.origem.lat},${createRouteDto.origem.lng}`;
        let furthestDistance = 0;
        let furthestWaypointIndex = -1;

        createRouteDto.destinos.forEach((destino, index) => {
            const distance = haversineDistance(
                { lat: parseFloat(createRouteDto.origem.lat), lng: parseFloat(createRouteDto.origem.lng) },
                { lat: parseFloat(destino.lat), lng: parseFloat(destino.lng) }
            );
            if (distance > furthestDistance) {
                furthestDistance = distance;
                furthestWaypointIndex = index;
            }
        });

        const destination = `${createRouteDto.destinos[furthestWaypointIndex].lat},${createRouteDto.destinos[furthestWaypointIndex].lng}`;

        const waypoints: (string | LatLng)[] = createRouteDto.destinos
            .map(destino => `${destino.lat},${destino.lng}`);



        const requestParams: DirectionsRequest['params'] = {
            origin,
            destination,
            waypoints: waypoints,
            optimize: true,
            mode: TravelMode.driving,
            key: this.configService.get('GOOGLE_MAPS_API_KEY'),
        };

        const { data } = await this.googleMapsClient.directions({ params: requestParams });

        const returnedWaypoints = createRouteDto.destinos
            .filter((_, index) => index !== furthestWaypointIndex)
            .map((destino, index) => ({
                location: {
                    lat: destino.lat,
                    lng: destino.lng,
                },
                order: index,
            }));


        return {
            ...data,
            request: {
                origin: {
                    location: {
                        lat: data.routes[0].legs[0].start_location.lat,
                        lng: data.routes[0].legs[0].start_location.lng,
                    },
                },
                waypoints: returnedWaypoints,
                destination: {
                    location: {
                        lat: data.routes[0].legs[0].end_location.lat,
                        lng: data.routes[0].legs[0].end_location.lng,
                    },
                },
                mode: requestParams.mode,
            }
        };
    }
}


