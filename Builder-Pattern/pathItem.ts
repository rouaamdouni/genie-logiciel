abstract class PathItem {
    constructor(
      public difficulty: number,
      public score: number,
      public prevItem?: PathItem,
      public nextItem?: PathItem,
    ) {}
  
    abstract show(): void
  }