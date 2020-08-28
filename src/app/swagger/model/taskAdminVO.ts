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
import { Options } from './options';
import { Test } from './test';
import { TopicVO } from './topicVO';
import { UserVO } from './userVO';

export interface TaskAdminVO {
  authorId?: UserVO;
  contributors?: Array<UserVO>;
  description?: string;
  id?: string;
  level?: TaskAdminVO.LevelEnum;
  options?: Options;
  tests?: Test;
  title?: string;
  topicId?: TopicVO;
}
export namespace TaskAdminVO {
  export type LevelEnum = 'JUNIOR' | 'MIDDLE' | 'SENIOR';
  export const LevelEnum = {
    JUNIOR: 'JUNIOR' as LevelEnum,
    MIDDLE: 'MIDDLE' as LevelEnum,
    SENIOR: 'SENIOR' as LevelEnum,
  };
}
