# SAP Customer Data Platform SDK (CDP SDK)
## Description
[SAP Customer Data Platform](https://help.sap.com/viewer/8438f051ded544d2ba1303e67fc5ff86/PROD/en-US/c3946f05ec914e7e8154fc5efa5a63d4.html)'s SDK provides an interface for the configuring your CDP instance and sending events for ingestion.
By SAP Customer Data Cloud (SAP CDC Gigya).

## Download and Installation
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
When initializing the SDK instance, you can override several of its properties mentioned below with their defaults:
```typescript
{
    proxy: undefined as string, // e.g. 'http://127.0.0.1:8888'
    ignoreCertError: false, // for ignoring certificate errors when using a proxy
    verboseLog: false // for informative logs
}
```

## Limitations
None

## Known Issues
None

## How to obtain support
Via SAP standard support.
https://developers.gigya.com/display/GD/Opening+A+Support+Incident

## Contributing
Via pull request to this repository.

## To-Do (upcoming changes)
None

## Licensing
Please see our [LICENSE](https://github.com/SAP/gigya-cdp-js-sdk/blob/main/LICENSES/Apache-2.0.txt) for copyright and license information.
