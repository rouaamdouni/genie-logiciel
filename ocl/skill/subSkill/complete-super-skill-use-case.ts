import { HttpStatus, Inject, Injectable } from "@nestjs/common"

import { Events, Repos } from "../../../utils/constants"
import { Left, Right } from "../../../utils/either"
import { ICompletedNodeRepo } from "../../completed_node/config/i-completed-node.repo"
import { INodeCompletedEvent } from "../../completed_node/node_completed/node-completed.event"
import { IEnrolledPathRepo } from "../../enrolled_path/config/i-enrolled-path.repo"
import { IPathRepo } from "../../path/config/i-path.repo"
import { IPathItemRepo } from "../../path_item/config/i-path-item.repo"
import { ISuperSkillRepo } from "../../super_skill/config/i-super-skill.repo"
import { ICompletedSuperSkillRepo } from "../config/i-completed-super-skill.repo"
import {
  CompleteSuperSkillArgs,
  CompleteSuperSkillResult,
  ICompleteSuperSkillUseCase,
} from "./i-complete-super-skill-use-case"

@Injectable()
export class CompleteSuperSkillUseCase implements ICompleteSuperSkillUseCase {
  constructor(
    @Inject(Repos.enrolledPath)
    private readonly enrolledPathRepo: IEnrolledPathRepo,
    @Inject(Repos.completedSuperSkill)
    private readonly completedSuperSkillRepo: ICompletedSuperSkillRepo,
    @Inject(Repos.completedNode)
    private readonly completedNodeRepo: ICompletedNodeRepo,
    @Inject(Repos.path) private readonly pathRepo: IPathRepo,
    @Inject(Repos.pathItem) private readonly pathItemRepo: IPathItemRepo,
    @Inject(Repos.superSkill) private readonly superSkillRepo: ISuperSkillRepo,
    @Inject(Events.completedNode)
    private readonly completedNodeEvent: INodeCompletedEvent,
  ) {}

  async execute(
    args: CompleteSuperSkillArgs,
  ): Promise<CompleteSuperSkillResult> {
    const existingPath = await this.pathRepo.getById(args.pathId)

    if (!existingPath)
      return Left.create({
        code: "path_not_found",
        message: "path not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingSuperSkill = await this.superSkillRepo.getById(
      args.superSkillId,
    )

    if (!existingSuperSkill)
      return Left.create({
        code: "super_skill_not_found",
        message: "super skill not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingPathItem = await this.pathItemRepo.get(
      args.pathId,
      args.superSkillId,
    )

    if (!existingPathItem)
      return Left.create({
        code: "entity_not_in_path",
        message: "this super skill is not part of the path",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingEnrolledPath = await this.enrolledPathRepo.get(
      args.pathId,
      args.studentId,
    )

    if (!existingEnrolledPath)
      return Left.create({
        code: "path_not_enrolled",
        message: "student not enrolled in path",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingCompletedTargetNode = await this.completedNodeRepo.get(
      args.studentId,
      args.pathId,
      args.superSkillId,
    )

    const existingCompletedSuperSkill = await this.completedSuperSkillRepo.get({
      pathId: args.pathId,
      studentId: args.studentId,
      superSkillId: args.superSkillId,
    })

    if (!existingCompletedTargetNode || !existingCompletedSuperSkill)
      return Left.create({
        code: "super_skill_not_started",
        message: "Super skill not started",
        status: HttpStatus.BAD_REQUEST,
      })

    if (existingCompletedTargetNode.isCompleted)
      return Left.create({
        code: "path_item_completed",
        message: "this super skill is already completed",
        status: HttpStatus.CONFLICT,
      })

    const completedSuperSkillUpdatedAt = new Date()
    await this.completedNodeRepo.save({
      ...existingCompletedTargetNode,
      isCompleted: true,
      score: existingSuperSkill.score,
      updatedAt: completedSuperSkillUpdatedAt,
    })

    await this.completedSuperSkillRepo.save({
      ...existingCompletedSuperSkill,
      isCompleted: true,
      score: existingSuperSkill.score,
      updatedAt: completedSuperSkillUpdatedAt,
    })

    await this.completedNodeEvent.newCompletedNode({
      entityId: args.superSkillId,
      pathId: args.pathId,
      studentId: args.studentId,
    })

    return Right.create({
      isSuccess: true,
      message: "Super skill completed successfully",
      payload: {
        pathId: args.pathId,
        studentId: args.studentId,
        superSkillId: args.superSkillId,
      },
    })
  }
}
