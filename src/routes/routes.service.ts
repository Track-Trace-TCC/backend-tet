import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { DirectionsService } from 'src/maps/directions/directions.service';
import { RouteStatus } from 'src/general/route-status/route-status.enum';
import { GetRouteDto } from './dto/get-route.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RoutesService {
  constructor(
    private prismaService: PrismaService,
    private directionsService: DirectionsService,
  ) { }
  async create(createRouteDto: CreateRouteDto) {
    const { available_travel_modes, geocoded_waypoints, routes, request } = await this.directionsService.getDirections(createRouteDto);
    const legs = routes[0].legs[0]


    return this.prismaService.rota.create({
      data: {
        nome: "Track & Trace Route +" + new Date().toISOString() + " " + createRouteDto.idMotorista,
        Motorista: {
          connect: {
            id_Motorista: createRouteDto.idMotorista
          }
        },
        duracao: legs.duration.value,
        origem: {
          name: legs.start_address,
          location: {
            lat: legs.start_location.lat,
            lng: legs.start_location.lng,
          }
        },
        destino: {
          name: legs.end_address,
          location: {
            lat: legs.end_location.lat,
            lng: legs.end_location.lng,
          }
        },
        status: RouteStatus.IN_TRANSIT,
        direcoes: JSON.stringify({
          available_travel_modes,
          geocoded_waypoints,
          waypoints: request.waypoints,
          routes,
          request,
        }),
      }
    })

  }

  async finishRoute(id: string) {
    const route = await this.prismaService.rota.findUnique({
      where: {
        id_Rota: id
      }
    });

    if (route.status === RouteStatus.FINISHED) {
      throw new Error('Route already finished');
    }

    return this.prismaService.rota.update({
      where: {
        id_Rota: id
      },
      data: {
        status: RouteStatus.FINISHED
      }
    });
  }

  async findOne(id: string) {
    const route = await this.prismaService.rota.findUnique({
      where: {
        id_Rota: id
      }
    });

    return plainToInstance(GetRouteDto, {
      name: route.nome,
      id: route.id_Rota,
      source: route.origem,
      destination: route.destino,
      duration: route.duracao,
      status: route.status,
      directions: typeof route.direcoes === 'string' ? JSON.parse(route.direcoes) : route.direcoes,
    });
  }
}
