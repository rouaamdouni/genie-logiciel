// Client
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Optional for Swagger docs
import { PathItem } from './path-item.entity';
import { PathItemsService } from '../../Builder-Pattern/builder_nest/builder.service';

@ApiTags('Learning Paths') 
@Controller('path-items')
export class PathItemsController {
  constructor(private readonly pathItemsService: PathItemsService) {}

  @Post('build')
  @ApiOperation({ summary: 'Build a custom learning path' }) // Swagger
  @ApiResponse({ status: 201, description: 'Path successfully created', type: [PathItem] })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  buildPath(@Body() items: any[]): PathItem[] {
    return this.pathItemsService.buildPath(items);
  }

  @Get('example')
  @ApiOperation({ summary: 'Get an example learning path' }) // Swagger
  @ApiResponse({ 
    status: 200, 
    description: 'Returns a pre-built example path',
    type: [PathItem]
  })
  getExamplePath(): PathItem[] {
    return this.pathItemsService.getExamplePath();
  }
}