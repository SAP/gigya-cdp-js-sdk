import {EntityDef} from "./ts-rest-client/interfaces/Entity";
import {EntityApi} from "./ts-rest-client/interfaces/EntityApi"; // ts bug, import separately and directly
import {
    Action,
    ActivityIndicator,
    Application,
    ApplicationAuth,
    ApplicationPriority,
    Audience,
    BusinessUnit,
    Connector,
    CustomerSchema,
    Event,
    EventHistory,
    EventStatus,
    Journey,
    MergeRule,
    Purpose,
    Segment,
    View,
    WithBusinessUnitId,
    WithProtected,
    WithProtectedFields,
    WithViewId,
    Workspace
} from "./entities";
import {EventMapping} from "./entities/Event/EventMapping";
import {EventSchedule} from "./entities/Event/EventSchedule";
import {MatchingRule, MatchingRulePriority} from "./entities/MatchingRule";
import {ActionMapping} from "./entities/Action/ActionMapping";
import { WithId, WithMetaData, WithTenantId, WithType} from "./entities/common";
import {InboundPurposes} from "./entities/Purpose/InboundPurposes";
import {CalculatedIndicator} from "./entities/indicators/CalculatedIndicator";
import {CustomerEntity} from "./entities/CustomerEntity";
import {CustomerActivity} from "./entities/Customer/CustomerActivity";
import {CustomerProfile} from "./entities/Customer/CustomerProfile";
import {Relationship} from "./entities/Relationship";

export type ServerOnlyFields = keyof (
    WithId
    & WithProtected
    & WithProtectedFields
    & WithMetaData
    & WithTenantId
    & WithBusinessUnitId &
    WithViewId);

export type CDPEntityDef<T extends object, SFields extends keyof T = never> =
    EntityDef<T, Extract<keyof T, ServerOnlyFields | SFields>>

export type CDPEntitiesApi = {
    global: {
        applibrary: EntityApi<CDPEntityDef<Connector>>,
    },
    workspaces: EntityApi<CDPEntityDef<Workspace>, {
        applibrary: EntityApi<CDPEntityDef<Connector>>,
    }>,

    businessunits: EntityApi<CDPEntityDef<BusinessUnit>, {

        schemas: EntityApi<CDPEntityDef<CustomerEntity>, {
            relationships: EntityApi<CDPEntityDef<Relationship>>;
            matchRules: EntityApi<CDPEntityDef<MatchingRule>>;
            journeys: EntityApi<CDPEntityDef<Journey>, {
                statsPayloads: EntityApi<CDPEntityDef<Journey>>
            }>,
        }>;

        customerschemas: EntityApi<CDPEntityDef<CustomerSchema>>;

        purposes: EntityApi<CDPEntityDef<Purpose>>;

        calculatedIndicators: EntityApi<CDPEntityDef<CalculatedIndicator>>;
        activityIndicators: EntityApi<CDPEntityDef<ActivityIndicator>>;
        segments: EntityApi<CDPEntityDef<Segment>>;

        applications: EntityApi<CDPEntityDef<Application, keyof WithType<any>>, {
            auth: EntityApi<CDPEntityDef<ApplicationAuth>, {
                test: EntityApi<CDPEntityDef<ApplicationAuth>>
            }>,
            priority: EntityApi<CDPEntityDef<ApplicationPriority>>,

            dataevents: EntityApi<CDPEntityDef<Event>, {
                mappings: EntityApi<CDPEntityDef<EventMapping[]>>;
                schedules: EntityApi<CDPEntityDef<EventSchedule>>;
                event: EntityApi; // TODO: allow only POST
                status: EntityApi<CDPEntityDef<EventStatus>>; // TODO: allow only GET
                history: EntityApi<CDPEntityDef<EventHistory>>; // TODO: allow only GET
                purposes: EntityApi<CDPEntityDef<InboundPurposes>>
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
                scheduled: EntityApi,
                status: EntityApi,
            }>;
            customers: EntityApi<CDPEntityDef<CustomerProfile>, { // TODO: allow only GET
                activities: { get({ query: string }): Promise<CustomerActivity> }
            }>;
        }>;
    }>;
};
