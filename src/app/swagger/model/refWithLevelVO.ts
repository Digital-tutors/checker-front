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

export interface RefWithLevelVO { 
    id?: number;
    level: RefWithLevelVO.LevelEnum;
}
export namespace RefWithLevelVO {
    export type LevelEnum = 'EASY' | 'HARD' | 'MIDDLE';
    export const LevelEnum = {
        EASY: 'EASY' as LevelEnum,
        HARD: 'HARD' as LevelEnum,
        MIDDLE: 'MIDDLE' as LevelEnum
    };
}