//ConcreteBuilder

import { Injectable } from '@nestjs/common';
import { PathItem } from './path-item.entity';
import { Project } from './path-item.entity';
import { Checkpoint } from './path-item.entity';
import { Quiz } from './path-item.entity';
import { Skill } from './path-item.entity';
import { SuperSkill } from './path-item.entity';
import { IPathItemBuilder } from './builder.interface';

@Injectable()
export class PathItemBuilder implements IPathItemBuilder {
  private result: PathItem[] = [];

  private linkToPrevious(item: PathItem): void {
    const last = this.result[this.result.length - 1];
    if (last) {
      last.nextItem = item;
      item.prevItem = last;
    }
  }

  addSuperSkill(
    label: string,
    description: string,
    contentFileURL: string,
    difficulty: number,
    score: number
  ) {
    const superSkill = new SuperSkill(
      label,
      description,
      contentFileURL,
      difficulty,
      score
    );
    this.linkToPrevious(superSkill);
    this.result.push(superSkill);
    return this;
  }

  addSkill(
    label: string,
    contentFileURL: string,
    difficulty: number,
    score: number
  ) {
    const skill = new Skill(label, contentFileURL, difficulty, score);
    this.linkToPrevious(skill);
    this.result.push(skill);
    return this;
  }

  addCheckpoint(
    label: string,
    contentFileURL: string,
    difficulty: number,
    score: number
  ) {
    const checkpoint = new Checkpoint(label, contentFileURL, difficulty, score);
    this.linkToPrevious(checkpoint);
    this.result.push(checkpoint);
    return this;
  }

  addQuiz(
    label: string,
    questionsCount: number,
    totalTime: number,
    difficulty: number,
    score: number
  ) {
    const quiz = new Quiz(
      label,
      questionsCount,
      totalTime,
      difficulty,
      score
    );
    this.linkToPrevious(quiz);
    this.result.push(quiz);
    return this;
  }

  addProject(
    label: string,
    contentFileURL: string,
    difficulty: number,
    score: number
  ) {
    const project = new Project(label, contentFileURL, difficulty, score);
    this.linkToPrevious(project);
    this.result.push(project);
    return this;
  }

  reset() {
    this.result = [];
  }

  getResult(): PathItem[] {
    return this.result;
  }
}