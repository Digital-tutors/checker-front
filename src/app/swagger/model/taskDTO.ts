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
import { OptionsDTO } from './optionsDTO';
import { RefVO } from './refVO';
import { TestsDTO } from './testsDTO';

export interface TaskDTO { 
    addons: Array<RefVO>;
    author?: RefVO;
    createdAt: number;
    description?: string;
    extensions: Array<RefVO>;
    id?: number;
    level: TaskDTO.LevelEnum;
    options?: OptionsDTO;
    replacements: Array<RefVO>;
    simplifications: Array<RefVO>;
    status: TaskDTO.StatusEnum;
    tests?: TestsDTO;
    title?: string;
    updatedAt: number;
}
export namespace TaskDTO {
    export type LevelEnum = 'EASY' | 'HARD' | 'MIDDLE';
    export const LevelEnum = {
        EASY: 'EASY' as LevelEnum,
        HARD: 'HARD' as LevelEnum,
        MIDDLE: 'MIDDLE' as LevelEnum
    };
    export type StatusEnum = 'ARCHIVED' | 'PUBLISHED' | 'UNPUBLISHED';
    export const StatusEnum = {
        ARCHIVED: 'ARCHIVED' as StatusEnum,
        PUBLISHED: 'PUBLISHED' as StatusEnum,
        UNPUBLISHED: 'UNPUBLISHED' as StatusEnum
    };
}