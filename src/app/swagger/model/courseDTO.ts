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
import { RefVO } from './refVO';

export interface CourseDTO {
  author?: RefVO;
  content: Array<RefVO>;
  createdAt: number;
  description?: string;
  id?: number;
  keywords: Array<string>;
  skills: Array<string>;
  status: CourseDTO.StatusEnum;
  subscribe: boolean;
  subtitle?: string;
  title?: string;
  updatedAt: number;
}
export namespace CourseDTO {
  export type StatusEnum = 'ARCHIVED' | 'PUBLISHED' | 'UNPUBLISHED';
  export const StatusEnum = {
    ARCHIVED: 'ARCHIVED' as StatusEnum,
    PUBLISHED: 'PUBLISHED' as StatusEnum,
    UNPUBLISHED: 'UNPUBLISHED' as StatusEnum,
  };
}
