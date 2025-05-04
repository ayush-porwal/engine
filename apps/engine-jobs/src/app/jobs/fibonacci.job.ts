import { PulsarClient } from '@engine/pulsar';
import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';
import { FibonacciData } from './fibonacci-data.interface';

@Job({
  name: 'fibonacci',
  description:
    'Calculates the fibonacci sequence and then store it in the database',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
  protected messageClass = FibonacciData;
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
