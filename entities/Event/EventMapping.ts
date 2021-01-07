import {MappingBase} from "../common/mapping";
import {SchemaId} from "../Schema";

export interface EventMapping extends MappingBase {
    target: SchemaId;
}
