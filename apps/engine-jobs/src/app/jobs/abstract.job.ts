import { Producer } from 'pulsar-client';
import { Serialize } from '@engine/pulsar';
import { PulsarClient } from '@engine/pulsar';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;
  constructor(private readonly pulsarClient: PulsarClient) {}

  private async validateData(data: T) {
    const errors = await validate(plainToInstance(this.messageClass, data));

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed!');
    }
  }

  private async send(data: T) {
    await this.producer.send({ data: Serialize(data) });
  }

  async execute(data: T, job: string) {
    await this.validateData(data);
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }

    if (Array.isArray(data)) {
      await Promise.all(data.map((item) => this.send(item)));
    } else {
      await this.send(data);
    }
  }
}
