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
import { AuthorRefVOShortResView } from './authorRefVOShortResView';
import { RefWithLevelVOShortResView } from './refWithLevelVOShortResView';

export interface LessonDTOShortResView { 
    addons: Array<RefWithLevelVOShortResView>;
    author?: AuthorRefVOShortResView;
    extensions: Array<RefWithLevelVOShortResView>;
    id?: number;
    level: LessonDTOShortResView.LevelEnum;
    replacements: Array<RefWithLevelVOShortResView>;
    simplifications: Array<RefWithLevelVOShortResView>;
    status: LessonDTOShortResView.StatusEnum;
    title?: string;
}
export namespace LessonDTOShortResView {
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