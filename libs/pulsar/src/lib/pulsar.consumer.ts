import { Logger, OnModuleInit } from '@nestjs/common';
import { Consumer, Message } from 'pulsar-client';
import { PulsarClient } from './plusar.client';
import { Deserialize } from './serialize';

export abstract class PulsarConsumer<T> implements OnModuleInit {
  private consumer: Consumer;
  protected readonly logger = new Logger(this.topic);
  constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly topic: string,
  ) {}

  protected abstract onMessage(data: T): Promise<void>;

  private async listener(message: Message) {
    try {
      const data = Deserialize<T>(message.getData());
      this.logger.log('message: ', data);
      await this.onMessage(data);
    } catch (error) {
      this.logger.error('Error processing message: ', error);
    } finally {
      await this.consumer.acknowledge(message);
    }
  }

  async onModuleInit() {
    this.consumer = await this.pulsarClient.createConsumer(
      this.topic,
      this.listener.bind(this),
    );
  }
}
