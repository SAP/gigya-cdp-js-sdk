import {JSONSchema7} from "json-schema";
import {WithType} from "./index";

export type ConfigOverrideScope = 'application' | 'action' | 'journey-action' | 'event';
export type ResourcePath = string;

export type WithConfigSchema = { configSchema?: JSONSchema7 & { type: 'object'; properties: { [propName: string]: JSONSchema7 & { scope: ConfigOverrideScope[] } } }; };
export type WithConfigValues = { configValues?: Record<string, any>; };
export type WithPollingConfig = {
    pollingConfigs?: Record<ResourcePath, {
        pageFieldName: string;
        recordsLocator?: string;
        dateFormat?: string; // default: ISO

        dateFieldName?: string; // redundant once we support idx vars
        pageSizeFieldName?: string; // redundant?
    }>;
};
export type WithResourcePath = {
    resourcePath: ResourcePath; // how we find the model/schema of the Connector
};
export type WithTestResourcePath = {
    testResourcePath?: ResourcePath; // how we find the model/schema of the Connector
};

// Drafts:
interface PagingConfigBase {}
interface PageNumConfig extends PagingConfigBase, WithType<'number'> {
    pageFieldName: string;
}

interface OffsetConfig extends PagingConfigBase, WithType<'offset'> {
    pageFieldName: string;
    pageSizeFieldName: string;
}

type PagingConfig = PageNumConfig | OffsetConfig;

interface WithPollingConfig2 {
    pollingConfigs: {
        recordsLocator?: string;
        pagingConfig: PagingConfig;
    }
}
