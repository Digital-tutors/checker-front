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

export interface CourseDTORequestView {
  author?: RefVORequestView;
  description?: string;
  keywords?: Array<string>;
  skills?: Array<string>;
  subtitle?: string;
  title?: string;
}
