import {Entity, Id, StaticEntity, WithEnabled} from "../common";
import {WithViewId} from "../View";
import {WithBusinessUnitId} from "../BusinessUnit";
import {AttributeFieldName, WithProtected} from "../common/Field";

export type MatchingRuleId = Id;

export interface MatchingRule extends StaticEntity<MatchingRuleId>, WithProtected, WithBusinessUnitId, WithViewId {
    /*
    @deprecated
     */
    attributeName?: AttributeFieldName;

    attributes: AttributeFieldName[];
    ucpResolutionPolicy: 'keepAll' | 'merge';
}

export interface MatchingRulePriority extends WithBusinessUnitId, WithViewId {
    rules: MatchingRuleId[];
}
