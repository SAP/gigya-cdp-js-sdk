import {WithType} from "./index";

export interface PagingConfigBase {}
export interface PageNumConfig extends PagingConfigBase, WithType<'number'> {
    pageFieldName: string;
}

export interface OffsetConfig extends PagingConfigBase, WithType<'offset'> {
    pageFieldName: string;
    pageSizeFieldName: string;
}

export type PagingConfig = PageNumConfig | OffsetConfig;
