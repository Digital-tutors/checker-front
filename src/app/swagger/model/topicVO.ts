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
import { UserVO } from './userVO';

export interface TopicVO {
  accessType?: string;
  authorId?: UserVO;
  contributors?: Array<UserVO>;
  createdDate?: string;
  followers?: Array<UserVO>;
  id?: string;
  title?: string;
}
