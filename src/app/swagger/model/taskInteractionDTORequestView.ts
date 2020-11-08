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

export interface TaskInteractionDTORequestView { 
    interactionEntity?: RefVORequestView;
    status: TaskInteractionDTORequestView.StatusEnum;
}
export namespace TaskInteractionDTORequestView {
    export type StatusEnum = 'COMPLETED' | 'STARTED';
    export const StatusEnum = {
        COMPLETED: 'COMPLETED' as StatusEnum,
        STARTED: 'STARTED' as StatusEnum
    };
}