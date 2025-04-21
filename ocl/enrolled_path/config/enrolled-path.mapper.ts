import { Injectable } from "@nestjs/common/decorators/core"
import { Types } from "mongoose"
import { IMapper } from "src/common/mapper"

import { EnrolledPath } from "./enrolled-path.domain"
import { EnrolledPathDTO } from "./enrolled-path.dto"

@Injectable()
export class EnrolledPathMapper
  implements IMapper<EnrolledPath, EnrolledPathDTO>
{
  toDomain(raw: any): EnrolledPath {
    return new EnrolledPath(
      raw.path.toString(),
      raw.student.toString(),
      raw.score,
      raw.completedItemsCount,
      raw.progressPointer,
      new Date(raw.createdAt),
      new Date(raw.updatedAt),
      raw.deletedAt && new Date(raw.deletedAt),
      raw.certificate,
    )
  }

  toDTO(domain: EnrolledPath): EnrolledPathDTO {
    return new EnrolledPathDTO(
      domain.path,
      domain.student,
      domain.score,
      domain.completedItemsCount,
      domain.progressPointer,
      domain.createdAt,
      domain.updatedAt,
      domain.certificate,
    )
  }

  toPersistence(domain: EnrolledPath) {
    return {
      certificate: domain.certificate,
      completedItemsCount: domain.completedItemsCount,
      createdAt: domain.createdAt,
      deletedAt: domain.deletedAt,
      path: new Types.ObjectId(domain.path),
      progressPointer: domain.progressPointer
        ? new Types.ObjectId(domain.progressPointer)
        : null,
      score: domain.score,
      student: new Types.ObjectId(domain.student),
      updatedAt: domain.updatedAt,
    }
  }
}
