import {Entity, Id, WithEnabled} from "../common";
import {WithViewId} from "../View";
import {WithBusinessUnitId} from "../BusinessUnit";
import {ProfileFieldName, WithProtected} from "../common/Field";

export type MatchingRuleId = Id;

export interface MatchingRule extends Omit<Entity<MatchingRuleId>, keyof WithEnabled>, WithProtected, WithBusinessUnitId, WithViewId {
    attributeName: ProfileFieldName;
    ucpResolutionPolicy: 'keepAll' | 'merge';
}

export interface MatchingRulePriority extends WithBusinessUnitId, WithViewId {
    rules: MatchingRuleId[];
}