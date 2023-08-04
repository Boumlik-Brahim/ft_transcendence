import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { ChannelGateway } from './gateway/channel.gateway';
import { ConnectedClientsService } from 'src/connected-clients.service';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, ChannelGateway, ConnectedClientsService]
})
export class ChannelModule {}
