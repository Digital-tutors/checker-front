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
import { RefVORequestView } from './refVORequestView';

export interface TaskResultDTORequestView {
  language?: string;
  sourceCode?: string;
  status?: TaskResultDTORequestView.StatusEnum;
  task?: RefVORequestView;
  user?: RefVORequestView;
}
export namespace TaskResultDTORequestView {
  export type StatusEnum = 'COMPLETED' | 'NOT_CHECKING' | 'RUNNING';
  export const StatusEnum = {
    COMPLETED: 'COMPLETED' as StatusEnum,
    NOTCHECKING: 'NOT_CHECKING' as StatusEnum,
    RUNNING: 'RUNNING' as StatusEnum,
  };
}