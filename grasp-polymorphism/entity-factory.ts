// factories/entity.factory.ts

import { Checkpoint } from "./checkpoint/checkpoint.domain";
import { Quiz } from "./quiz/quiz.domain";
import { Reward } from "./reward/reward.domain";
import { Skill } from "./skill/skill.domain";
import { SuperSkill } from "./super_skill/super-skill.domain";
import { defaultCheckpointDifficulty, defaultCheckpointScore, defaultRewardDifficulty, defaultRewardScore, defaultSkillDifficulty, defaultSkillScore, defaultSuperSkillDifficulty, defaultSuperSkillScore } from "./utils/constants";
import { TEntity } from "./utils/entity";

export class EntityFactory {
  static create(type: TEntity, id: string, args: any): any {
    const lang = args.defaultLanguage;
    const label = [{ content: args.label, language: lang }];
    const metaTags = args.metaTags?.map((tag: string) => [{ content: tag, language: lang }]);
    const fileURL = args.contentFileURL ? [{ content: args.contentFileURL, language: lang }] : [];

    switch (type) {
      case 'superSkills':
        return new SuperSkill(
          id,
          args.slug,
          label,
          [{ content: args.description, language: lang }],
          fileURL,
          metaTags,
          lang,
          args.difficulty ?? defaultSuperSkillDifficulty,
          args.score ?? defaultSuperSkillScore
        );
      case 'skills':
        return new Skill(
          id,
          args.slug,
          label,
          fileURL,
          metaTags,
          lang,
          args.score ?? defaultSkillScore,
          args.difficulty ?? defaultSkillDifficulty
        );
      case 'quizzes':
        return new Quiz(
          id,
          args.slug,
          label,
          metaTags,
          0,
          0,
          lang
        );
      case 'rewards':
        return new Reward(
          id,
          args.slug,
          label,
          fileURL,
          metaTags,
          lang,
          args.score ?? defaultRewardScore,
          args.difficulty ?? defaultRewardDifficulty
        );
      case 'checkpoints':
        return new Checkpoint(
          id,
          args.slug,
          label,
          fileURL,
          metaTags,
          lang,
          args.score ?? defaultCheckpointScore,
          args.difficulty ?? defaultCheckpointDifficulty
        );
      default:
        throw new Error(`Unknown entity type: ${type}`);
    }
  }
}
