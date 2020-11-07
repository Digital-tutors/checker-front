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

export interface TaskResultDTO {
  attempt: number;
  codeReturn?: string;
  completed: boolean;
  createdAt: number;
  id?: number;
  language?: string;
  memory?: string;
  messageOut?: string;
  runtime?: string;
  sourceCode?: string;
  status: TaskResultDTO.StatusEnum;
  task?: RefVO;
  updatedAt: number;
  user?: RefVO;
}
export namespace TaskResultDTO {
  export type StatusEnum = 'COMPLETED' | 'NOT_CHECKING' | 'RUNNING';
  export const StatusEnum = {
    COMPLETED: 'COMPLETED' as StatusEnum,
    NOTCHECKING: 'NOT_CHECKING' as StatusEnum,
    RUNNING: 'RUNNING' as StatusEnum,
  };
}