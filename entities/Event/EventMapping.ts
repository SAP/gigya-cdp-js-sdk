import {SchemaId} from "../Schema";

type SchemaPath = `$.${string}`

interface Source {
    id: SchemaId;
    path: SchemaPath;
    type: "schema" | "itemVar" | "sub";
    find?: Selector;
    source?: Source;
}

interface Selector {
    condition: any;
    type: "first" | "singleOrFail";
}

interface ValueProvider {
    source: Source;
    transformations?: TransformationDetail[];
}

interface  SchemaNewFieldMapping {
    valueProvider?: ValueProvider;
    arrayItemsProvider?: ArrayItemProvider;
    properties?: {[key: string]: SchemaNewFieldMapping};
    items?: SchemaNewFieldMapping[];
}

interface ArrayItemProvider {
    source: Source;
    transformations?: TransformationDetail[];
    itemVar: string;
}

interface TransformationDetail {
    name: string;
    sourceSchema: SchemaId;
    targetSchema: SchemaId;
    isConfigRequired: boolean;
}

export interface EventMapping {
    target: SchemaId;
    mapping: SchemaNewFieldMapping;
}
