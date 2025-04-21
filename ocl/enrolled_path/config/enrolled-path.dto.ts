export class EnrolledPathDTO {
  constructor(
    public readonly path: string,
    public readonly student: string,
    public readonly score: number,
    public readonly completedItemsCount: number,
    public readonly progressPointer: null | string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly certificate?: string,
  ) {}
}
