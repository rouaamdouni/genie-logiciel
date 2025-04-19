export class CompletedSuperSkillDTO {
  constructor(
    public readonly pathId: string,
    public readonly studentId: string,
    public readonly superSkillId: string,
    public readonly isCompleted: boolean,
    public readonly score: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
