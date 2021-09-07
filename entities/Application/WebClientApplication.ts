import {ApplicationBase} from "./common";
import {WithType} from "../common";

export interface WebClientApplication extends ApplicationBase, WithType<'WebClient'> {}
