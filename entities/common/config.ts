import {JSONSchema7} from "json-schema";

export type ConfigOverrideScope = 'application' | 'action' | 'journey-action' | 'event';

export type WithConfigSchema = { configSchema?: JSONSchema7 & { type: 'object'; properties: { [propName: string]: JSONSchema7 & { scope: ConfigOverrideScope[] } } }; };
export type WithConfigValues = { configValues?: Record<string, any>; };
export type WithResourcePath = {
    resourcePath: string; // how we find the model/schema of the Connector
};