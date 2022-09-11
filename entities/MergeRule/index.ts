import {AttributeFieldName, WithProtected} from "../common/Field";

export interface MergeRule {
    properties: Record<AttributeFieldName, Partial<WithProtected> & {
        name: AttributeFieldName;
        writePolicy: 'immutable' | 'mutable';
        maxValues: number;
        writeConflictRule: 'discardEvent' | 'createUcp';
        isProtected?: boolean;
    }>;
}
