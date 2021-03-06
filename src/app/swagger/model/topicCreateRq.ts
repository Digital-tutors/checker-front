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

export interface TopicCreateRq {
  title?: string;
  accessType?: TopicCreateRq.AccessTypeEnum;
  followers?: Array<EntityRefRq>;
  authorId?: EntityRefRq;
  contributors?: Array<EntityRefRq>;
}
export namespace TopicCreateRq {
  export type AccessTypeEnum = 'PUBLIC' | 'PRIVATE';
  export const AccessTypeEnum = {
    PUBLIC: 'PUBLIC' as AccessTypeEnum,
    PRIVATE: 'PRIVATE' as AccessTypeEnum,
  };
}
