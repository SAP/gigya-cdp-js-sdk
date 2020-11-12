# Gigya CDP SDK
## Install
```
npm i gigya-cdp-sdk
```

## Usage
```
import {CDP} from "gigya-cdp-sdk";

const sdk = new CDP({
    userKey: '123123123',
    secret: '*************'
}, { /* SDK Options */ });

sdk.businessunits.for('123-buId').get().then(bu => bu.name);
```

### SDK Options
```typescript
{
    protocol: 'https' as HttpProtocol,
    dataCenter: 'eu5' as DataCenter,
    env: 'prod' as Env,
    baseDomain: 'gigya.com',
    rootPath: 'api',
    proxy: undefined as string, // e.g. 'http://127.0.0.1:8888'
    ignoreCertError: false,
    verboseLog: false
}
```

### Supported Entities
* workspaces
    * applibrary
    * global/applibrary
* businessunits
    * mappings
    * ucpschemas
    * purposes
    * activityIndicators ([)no autocomplete for conditions)
    * segments (no autocomplete for conditions)
    * applications
        * dataevents
            * schedule
            * activate
            * event ("ingest")
        * actions
            * mappings
            * activate
    * views
        * matchRules
        * matchRulesPriority
        * mergeRules
        * journeys
        * audiences (with Condition)