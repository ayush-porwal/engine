import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { FibonacciJob } from './fibonacci.job';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from 'types/proto/auth';
import { GqlAuthGuard } from '@engine/my-graphql';
import { PulsarModule } from '@engine/pulsar';

@Module({
  imports: [
    DiscoveryModule,
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/auth.proto'),
        },
      },
    ]),
    PulsarModule,
  ],
  providers: [FibonacciJob, JobsService, JobsResolver, GqlAuthGuard],
})
export class JobsModule {}
