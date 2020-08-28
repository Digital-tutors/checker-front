/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { EntityRefRq } from './entityRefRq';
import { Options } from './options';
import { Test } from './test';

export interface TaskCreateRq {
  authorId?: EntityRefRq;
  topicId?: EntityRefRq;
  contributors?: Array<EntityRefRq>;
  level?: TaskCreateRq.LevelEnum;
  description?: string;
  options?: Options;
  tests?: Test;
  title?: string;
}
export namespace TaskCreateRq {
  export type LevelEnum = 'JUNIOR' | 'MIDDLE' | 'SENIOR';
  export const LevelEnum = {
    JUNIOR: 'JUNIOR' as LevelEnum,
    MIDDLE: 'MIDDLE' as LevelEnum,
    SENIOR: 'SENIOR' as LevelEnum,
  };
}
