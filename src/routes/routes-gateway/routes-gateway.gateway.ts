import { InjectQueue } from '@nestjs/bull';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Queue } from 'bull';
import { Socket } from 'socket.io';

@WebSocketGateway(
  {
    cors: {
      origin: '*',
    },
  }
)
export class RoutesGateway {
  constructor(@InjectQueue('new-points') private driverPointsQueue: Queue) { }
  @SubscribeMessage('new-points')
  async handleMessage(client: Socket, payload: {
    route_id: string; driver_id: string; lat: number; lng: number
  }) {
    console.log('oiiii vinicius')
    client.broadcast.emit('admin-new-points', payload);
    client.broadcast.emit(`new-points/${payload.driver_id}`, payload);

    await this.driverPointsQueue.add(payload)
  }
}
