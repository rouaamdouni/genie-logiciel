import { HttpStatus, Inject, Injectable } from "@nestjs/common"

import { Events, Repos } from "../../../utils/constants"
import { Left, Right } from "../../../utils/either"
import { ICompletedNodeRepo } from "../../completed_node/config/i-completed-node.repo"
import { INodeCompletedEvent } from "../../completed_node/node_completed/node-completed.event"
import { IEnrolledPathRepo } from "../../enrolled_path/config/i-enrolled-path.repo"
import { IPathRepo } from "../../path/config/i-path.repo"
import { IPathItemRepo } from "../../path_item/config/i-path-item.repo"
import { ISkillRepo } from "../../skill/config/i-skill.repo"
import { ICompletedSkillRepo } from "../config/i-completed-skill.repo"
import {
  CompleteSkillArgs,
  CompleteSkillResult,
  ICompleteSkillUseCase,
} from "./i-complete-skill-use-case"

@Injectable()
export class CompleteSkillUseCase implements ICompleteSkillUseCase {
  constructor(
    @Inject(Repos.enrolledPath)
    private readonly enrolledPathRepo: IEnrolledPathRepo,
    @Inject(Repos.completedSkill)
    private readonly completedSkillRepo: ICompletedSkillRepo,
    @Inject(Repos.completedNode)
    private readonly completedNodeRepo: ICompletedNodeRepo,
    @Inject(Repos.path) private readonly pathRepo: IPathRepo,
    @Inject(Repos.pathItem) private readonly pathItemRepo: IPathItemRepo,
    @Inject(Repos.skill) private readonly skillRepo: ISkillRepo,
    @Inject(Events.completedNode)
    private readonly completedNodeEvent: INodeCompletedEvent,
  ) {}

  async execute(args: CompleteSkillArgs): Promise<CompleteSkillResult> {
    const existingPath = await this.pathRepo.getById(args.pathId)

    if (!existingPath)
      return Left.create({
        code: "path_not_found",
        message: "path not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingSkill = await this.skillRepo.getById(args.skillId)

    if (!existingSkill)
      return Left.create({
        code: "skill_not_found",
        message: "skill not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingPathItem = await this.pathItemRepo.get(
      args.pathId,
      args.skillId,
    )

    if (!existingPathItem)
      return Left.create({
        code: "entity_not_in_path",
        message: "this skill is not part of the path",
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
      args.skillId,
    )

    const existingCompletedSkill = await this.completedSkillRepo.get({
      pathId: args.pathId,
      skillId: args.skillId,
      studentId: args.studentId,
    })

    if (!existingCompletedTargetNode || !existingCompletedSkill)
      return Left.create({
        code: "skill_not_started",
        message: "skill not started",
        status: HttpStatus.BAD_REQUEST,
      })

    if (existingCompletedTargetNode.isCompleted)
      return Left.create({
        code: "path_item_completed",
        message: "this skill is already completed",
        status: HttpStatus.CONFLICT,
      })

    const completedSkillUpdatedAt = new Date()
    await this.completedNodeRepo.save({
      ...existingCompletedTargetNode,
      isCompleted: true,
      score: existingSkill.score,
      updatedAt: completedSkillUpdatedAt,
    })

    await this.completedSkillRepo.save({
      ...existingCompletedSkill,
      isCompleted: true,
      score: existingSkill.score,
      updatedAt: completedSkillUpdatedAt,
    })

    await this.completedNodeEvent.newCompletedNode({
      entityId: args.skillId,
      pathId: args.pathId,
      studentId: args.studentId,
    })

    return Right.create({
      isSuccess: true,
      message: "Super skill completed successfully",
      payload: {
        pathId: args.pathId,
        skillId: args.skillId,
        studentId: args.studentId,
      },
    })
  }
}
