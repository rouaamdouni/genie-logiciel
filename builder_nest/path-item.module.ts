// path-items.module.ts
import { Module } from '@nestjs/common';
import { PathItemBuilder } from './path-item.builder';
import { PathItemsController } from '../../Builder-Pattern/builder_nest/path.controller.ts';

@Module({
  controllers: [PathItemsController],
  providers: [PathItemBuilder],
})
export class PathItemsModule {}