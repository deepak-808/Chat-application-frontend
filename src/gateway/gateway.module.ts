import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [],
  exports: [],
  providers: [WebsocketGateway],
})
export class GatewayModule {}
