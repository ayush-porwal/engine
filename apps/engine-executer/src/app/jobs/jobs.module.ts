import { PulsarModule } from '@engine/pulsar';
import { Module } from '@nestjs/common';
import { FibonacciConsumer } from './fibonacci/fibonacci.consumer';

@Module({
  imports: [PulsarModule],
  controllers: [],
  providers: [FibonacciConsumer],
})
export class JobsModule {}
