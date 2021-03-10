import {EntityDef} from "./ts-rest-client/interfaces/Entity";
import {EntityApi} from "./ts-rest-client/interfaces/EntityApi"; // ts bug, import separately and directly
import {
    Action,
    ActivityIndicator,
    Application, ApplicationAuth, Audience,
    BusinessUnit, Connector,
    Event, Journey,
    MergeRule, Purpose,
    Segment,
    View, WithBusinessUnitId, WithProtected, WithProtectedFields, WithViewId,
    Workspace
} from "./entities";
import {EventMapping} from "./entities/Event/EventMapping";
import {EventSchedule} from "./entities/Event/EventSchedule";
import {MatchingRule, MatchingRulePriority} from "./entities/MatchingRule";
import {ActionMapping} from "./entities/Action/ActionMapping";
import {CustomerSchema} from "./entities";
import {Payload, WithId, WithMetaData, WithType} from "./entities/common";

export type ServerOnlyFields = keyof (
    WithId
    & WithProtected
    & WithProtectedFields
    & WithMetaData
    & WithBusinessUnitId &
    WithViewId);

export type CDPEntityDef<T extends object, SFields extends keyof T = never> =
    EntityDef<T, Extract<keyof T, ServerOnlyFields | SFields>>

export type CDPEntitiesApi = {
    workspaces: EntityApi<CDPEntityDef<Workspace>, {
        applibrary: EntityApi<CDPEntityDef<Connector>>,
        global: EntityApi<never, {
            applibrary: EntityApi<CDPEntityDef<Connector>>,
        }>;
    }>,

    businessunits: EntityApi<CDPEntityDef<BusinessUnit>, {
        ucpschemas: EntityApi<CDPEntityDef<CustomerSchema>>;

        purposes: EntityApi<CDPEntityDef<Purpose>>;

        activityIndicators: EntityApi<CDPEntityDef<ActivityIndicator>>;
        segments: EntityApi<CDPEntityDef<Segment>>;
        applications: EntityApi<CDPEntityDef<Application, keyof WithType<any>>, {
            auth: EntityApi<CDPEntityDef<ApplicationAuth>, {
                test: EntityApi<CDPEntityDef<ApplicationAuth>>
            }>,

            dataevents: EntityApi<CDPEntityDef<Event>, {
                schedules: EntityApi<CDPEntityDef<EventSchedule>>;
                event: EntityApi;
                activate: EntityApi;
                status: EntityApi;
                mappings: EntityApi<CDPEntityDef<EventMapping[]>>;
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
            audiences: EntityApi<CDPEntityDef<Audience>, {
                export: EntityApi,
                status: EntityApi,
            }>;
            test: EntityApi<CDPEntityDef<{ vals: 'a' | 'b' | 'c' }>>;
        }>;
    }>;
};
