import { PathItem } from './path-item.entity';

export class Path {
  constructor(
    public label: string,
    public category: string,
    public coverURL: string,
    public pathItems: PathItem[],
  ) {}

  show() {
    const firstPathItem = this.pathItems.find((pathItem) => !pathItem.prevItem);

    if (firstPathItem) {
      let temp: PathItem | undefined = firstPathItem;
      while (!!temp) {
        console.log('=======');
        temp.show();
        temp = temp.nextItem;
      }
    }
  }
}
