import {Id} from "../common";
import { SchemaBase} from "../CustomerEntity";

export interface Relationship extends SchemaBase {
    childSchemaId: Id;
    parentSchemaId: Id;
}
