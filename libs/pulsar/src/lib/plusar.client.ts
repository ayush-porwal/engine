import { Client, Consumer, Message, Producer } from 'pulsar-client';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private readonly client = new Client({
    serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
  });
  private producers: Producer[] = [];
  private consumers: Consumer[] = [];
  constructor(private readonly configService: ConfigService) {}

  async createProducer(topic: string) {
    const producer = await this.client.createProducer({ topic });
    this.producers.push(producer);
    return producer;
  }

  async createConsumer(topic: string, listener: (message: Message) => void) {
    const consumer = await this.client.subscribe({
      topic,
      listener,
      subscription: 'engine',
    });
    this.consumers.push(consumer);
    return consumer;
  }

  async onModuleDestroy() {
    await Promise.all(this.producers.map((producer) => producer.close()));
    await this.client.close();
  }
}
