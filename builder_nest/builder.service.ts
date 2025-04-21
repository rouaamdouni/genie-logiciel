// Director
import { Injectable } from '@nestjs/common';
import { PathItemBuilder } from './path-item.builder';
import { PathItem } from './path-item.entity';

@Injectable()
export class PathItemsService {
  constructor(private readonly pathItemBuilder: PathItemBuilder) {}

  buildPath(items: any[]): PathItem[] {
    this.pathItemBuilder.reset();

    items.forEach(item => {
      switch (item.type) {
        case 'super-skill':
          this.pathItemBuilder.addSuperSkill(
            item.label,
            item.description,
            item.contentFileURL,
            item.difficulty,
            item.score
          );
          break;
        case 'skill':
          this.pathItemBuilder.addSkill(
            item.label,
            item.contentFileURL,
            item.difficulty,
            item.score
          );
          break;
        case 'checkpoint':
          this.pathItemBuilder.addCheckpoint(
            item.label,
            item.contentFileURL,
            item.difficulty,
            item.score
          );
          break;
        case 'quiz':
          this.pathItemBuilder.addQuiz(
            item.label,
            item.questionsCount,
            item.totalTime,
            item.difficulty,
            item.score
          );
          break;
        case 'project':
          this.pathItemBuilder.addProject(
            item.label,
            item.contentFileURL,
            item.difficulty,
            item.score
          );
          break;
        default:
          throw new Error(`Unknown path item type: ${item.type}`);
      }
    });

    return this.pathItemBuilder.getResult();
  }

  getExamplePath(): PathItem[] {
    this.pathItemBuilder.reset();
    
    return this.pathItemBuilder
      .addSuperSkill('SuperSkill HTML', 'Learn HTML fundamentals', 'content/html', 1, 100)
      .addSkill('HTML Forms', 'content/html-forms', 1, 50)
      .addQuiz('HTML Basics', 10, 30, 1, 75)
      .addCheckpoint('HTML Checkpoint', 'content/html-check', 1, 100)
      .addSuperSkill('SuperSkill CSS', 'Learn CSS styling', 'content/css', 2, 150)
      .addSkill('CSS Flexbox', 'content/flexbox', 2, 75)
      .addProject('Portfolio Website', 'content/portfolio', 3, 200)
      .getResult();
  }
}