import {JSONSchema7} from "json-schema";
import {WithType} from "../common";

export type AuthTypes = 'basic'|'oauth2';

export interface AuthBase extends WithType<AuthTypes> {
  // TODO
}

export interface CustomAuth extends JSONSchema7 {
  type: 'object';
}

export interface BasicAuth extends AuthBase {
  type: 'basic';
}
export interface OAuth2 extends AuthBase {
  type: 'oauth2';
}

export type Authentication = BasicAuth | OAuth2 | CustomAuth;

export type SecuritySchemeName = string;

export type WithSecuritySchemes = {
  securitySchemes: Record<SecuritySchemeName, Authentication>;
}
