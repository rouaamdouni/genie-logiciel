class Path {

    constructor(
      public label: string,
      public category: string,
      public coverURL: string,
      public pathItems: Array<PathItem>
    ) {}
  
    show() {
      const firstPathItem = this.pathItems.find(pathItem => !pathItem.prevItem)
  
      if (firstPathItem) {
          let temp: PathItem | undefined = firstPathItem
          while (!!temp) {
              console.log("=======")
              temp.show()
              temp = temp.nextItem
          } 
      }
  
    }
  }