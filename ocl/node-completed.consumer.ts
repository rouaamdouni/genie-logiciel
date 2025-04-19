import { Process, Processor } from "@nestjs/bull"
import { Inject } from "@nestjs/common"
import { Job } from "bull"
import { Jobs, Queues, Repos } from "src/utils/constants"

import { IEnrolledPathRepo } from "../../enrolled_path/config/i-enrolled-path.repo"
import { IStatisticsRepo } from "../../statistics/config/i-statistics.repo"
import { ICompletedNodeRepo } from "../config/i-completed-node.repo"
import { NewCompletedNodeArgs } from "./node-completed.event"

@Processor(Queues.nodeCompleted)
export class NodeCompletedConsumer {
  constructor(
    @Inject(Repos.enrolledPath)
    private readonly enrolledPathRepo: IEnrolledPathRepo,
    @Inject(Repos.completedNode)
    private readonly completedNodeRepo: ICompletedNodeRepo,
    @Inject(Repos.statistics) private readonly statisticsRepo: IStatisticsRepo,
  ) {}

  @Process(Jobs.newCompletedNode)
  async newCompletedNode({ data }: Job<NewCompletedNodeArgs>) {
    const existingEnrolledPath = await this.enrolledPathRepo.get(
      data.pathId,
      data.studentId,
    )

    if (!existingEnrolledPath) return

    const completedNode = await this.completedNodeRepo.get(
      data.studentId,
      data.pathId,
      data.entityId,
    )

    if (!completedNode) return

    await this.enrolledPathRepo.save({
      ...existingEnrolledPath,
      completedItemsCount: existingEnrolledPath.completedItemsCount + 1,
      score: existingEnrolledPath.score + completedNode.score,
      updatedAt: new Date(),
    })

    const existingStatistics = await this.statisticsRepo.get(data.studentId)

    await this.statisticsRepo.update({
      score: existingStatistics
        ? existingStatistics.score + completedNode.score
        : completedNode.score,
      studentId: data.studentId,
    })
  }
}
