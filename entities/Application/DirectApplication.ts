import {ApplicationBase} from "./common";
import {WithType} from "../common";
import {Application} from "./index";

export interface DirectApplication extends ApplicationBase, WithType<'Direct'> {}

export function isDirectApplication(app: Application): app is DirectApplication {
    return 'type' in app;
}
