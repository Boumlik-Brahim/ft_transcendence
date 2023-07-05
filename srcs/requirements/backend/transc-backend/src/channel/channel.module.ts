import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { ChannelGateway } from './gateway/channel.gateway';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, ChannelGateway]
})
export class ChannelModule {}
