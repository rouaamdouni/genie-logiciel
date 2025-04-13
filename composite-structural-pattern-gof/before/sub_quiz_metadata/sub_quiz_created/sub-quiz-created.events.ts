import { InjectQueue } from "@nestjs/bull"
import { Injectable } from "@nestjs/common"
import { Queue } from "bull"
import { Jobs, Queues } from "src/utils/constants"

export interface ISubQuizCreatedEvent {
  newSubQuizCreated(args: NewSubQuizCreatedArgs): Promise<void>
}

export type NewSubQuizCreatedArgs = {
  questionId: string
  quizId: string
}

@Injectable()
export class SubQuizCreatedEvent implements ISubQuizCreatedEvent {
  constructor(
    @InjectQueue(Queues.subQuizCreated)
    private readonly subQuizCreatedQueue: Queue,
  ) {}

  async newSubQuizCreated(args: NewSubQuizCreatedArgs): Promise<void> {
    await this.subQuizCreatedQueue.add(Jobs.newSubQuizCreated, args)
  }
}
