import {JSONSchema7} from "json-schema";
import {WithType} from "./index";
import {PagingConfig} from "./PagingConfig";

export type ConfigOverrideScope = 'application' | 'action' | 'journey-action' | 'event';
export type ResourcePath = string;

export type WithConfigSchema = { configSchema?: JSONSchema7 & { type: 'object'; properties: { [propName: string]: JSONSchema7 & { scope: ConfigOverrideScope[] } } }; };
export type WithConfigValues = { configValues?: Record<string, any>; };

export type WithResourcePath = {
    resourcePath: ResourcePath; // how we find the model/schema of the Connector
};
export type WithTestResourcePath = {
    testResourcePath?: ResourcePath; // how we find the model/schema of the Connector
};

export interface WithPollingConfig {
    pollingConfigs?: Record<string, {
        recordsLocator?: string;
        pagingConfig: PagingConfig;
    }>;
}
