import {EntityApi, EntityDef} from "./ts-rest-client";
import {
    Action,
    ActivityIndicator,
    Application,
    BusinessUnit, Connector,
    Event, Journey,
    MergeRule, Purpose,
    Segment,
    View,
    Workspace
} from "./entities";
import {EventMapping} from "./entities/Event/EventMapping";
import {EventSchedule} from "./entities/Event/EventSchedule";
import {MatchingRule, MatchingRulePriority} from "./entities/MatchingRule";
import {ActionMapping} from "./entities/Action/ActionMapping";
import {CustomerSchema} from "./entities/Schema";
import {WithId, WithMetaData} from "./entities/common";


export type ServerOnlyFields = keyof (WithId & WithMetaData);

export type CDPEntityDef<T extends object> = EntityDef<T, Extract<keyof T, ServerOnlyFields>>

export type CDPEntitiesApi = {
    workspaces: EntityApi<CDPEntityDef<Workspace>, {
        applibrary: EntityApi<CDPEntityDef<Connector>>,
        global: EntityApi<never, {
            applibrary: EntityApi<CDPEntityDef<Connector>>,
        }>;
    }>,
    businessunits: EntityApi<CDPEntityDef<BusinessUnit>, {
        mappings: EntityApi<CDPEntityDef<Record<string, Array<{sourceField: string; targetField: string}>>>>; // deprecate this

        ucpschemas: EntityApi<CDPEntityDef<CustomerSchema>>;

        purposes: EntityApi<CDPEntityDef<Purpose>>;

        activityIndicators: EntityApi<CDPEntityDef<ActivityIndicator>>;
        segments: EntityApi<CDPEntityDef<Segment>>;
        applications: EntityApi<CDPEntityDef<Application>, {

            dataevents: EntityApi<CDPEntityDef<Event>, {
                // mappings: EntityApi<CDPEntityDef<EventMapping[]>>; // TBD
                schedule: EntityApi<CDPEntityDef<EventSchedule>>;
                event: EntityApi;
                // events: EntityApi<EntityApi<Array<object>>>;
                activate: EntityApi;
            }>;

            actions: EntityApi<CDPEntityDef<Action>, {
                mappings: EntityApi<CDPEntityDef<ActionMapping[]>>;
                activate: EntityApi;
            }>;

        }>;
        views: EntityApi<CDPEntityDef<View>, {
            matchRules: EntityApi<CDPEntityDef<MatchingRule>>;
            matchRulesPriority: EntityApi<CDPEntityDef<MatchingRulePriority>>;

            mergeRules: EntityApi<CDPEntityDef<MergeRule>>;

            journeys: EntityApi<CDPEntityDef<Journey>>;
        }>;
    }>;
};
