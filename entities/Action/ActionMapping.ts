import {ApplicationId} from "../Application";
import {MappingBase} from "../common/mapping";
import {SchemaId} from "../Schema";

export interface ActionMapping extends MappingBase {
  src: SchemaId | ApplicationId; // mapping either from customer schemas or from Application's configSchema
}
