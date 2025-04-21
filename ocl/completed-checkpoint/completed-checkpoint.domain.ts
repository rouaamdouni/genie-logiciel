export class CompletedCheckpoint {
  constructor(
    public readonly path: string,
    public readonly student: string,
    public readonly checkpoint: string,
    public readonly isCompleted: boolean,
    public readonly isRated: boolean,
    public readonly passedTime: number,
    public readonly score: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly studentProjectURL?: string,
    public readonly feedbackDocumentURL?: string,
    public readonly projectType?: string,
  ) {}
}
