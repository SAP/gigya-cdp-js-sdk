import {Entity, Id} from "../common";
import {WithViewId} from "../View";
import {WithBusinessUnitId} from "../BusinessUnit";
import {ProfileFieldName} from "../common/Field";

export type MatchingRuleId = Id;

export interface MatchingRule extends Entity<MatchingRuleId>, WithBusinessUnitId, WithViewId {
    attributeName: ProfileFieldName;
    ucpResolutionPolicy: 'keepAll' | 'merge';
}

export interface MatchingRulePriority extends WithBusinessUnitId, WithViewId {
    rules: MatchingRuleId[];
}