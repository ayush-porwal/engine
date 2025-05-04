import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from './models/jobs.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from './dto/executeJob.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@engine/my-graphql';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobService: JobsService) {}

  @Query(() => [Job], { name: 'jobs' })
  @UseGuards(GqlAuthGuard)
  async getJobs() {
    return this.jobService.getJobs();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJobInput) {
    return this.jobService.executeJob(
      executeJobInput.name,
      executeJobInput.data,
    );
  }
}
