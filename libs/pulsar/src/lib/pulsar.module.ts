import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PulsarClient } from './plusar.client';

@Module({
  imports: [ConfigModule],
  providers: [PulsarClient],
  exports: [PulsarClient],
})
export class PulsarModule {}
