import {JSONSchema7} from "json-schema";

export type ConfigOverrideScope = 'application' | 'action' | 'journey-action' | 'event';
export type ResourcePath = string;

export type WithConfigSchema = { configSchema?: JSONSchema7 & { type: 'object'; properties: { [propName: string]: JSONSchema7 & { scope: ConfigOverrideScope[] } } }; };
export type WithConfigValues = { configValues?: Record<string, any>; };
export type WithPollingConfig = {
    pollingConfigurations?: Record<ResourcePath, {
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















const connector =
    {
        "enabled": true,
        "updated": "2020-12-15T08:04:39.078088Z",
        "created": "2020-12-15T08:04:17.6817911Z",
        "tenantId": "global",
        "workspaceId": "36935776",
        "id": "HMj9g-8gfybu4u0b76tnFA",
        "name": "SAP Customer Data Cloud CIAM Connector",
        "vendor": "SAP CDC",
        "description": "Generic CDC Connector",
        "logoUrl": "https://www.nuget.org/profiles/gigya/avatar?imageSize=512",
        "version": "1.0",
        "category": "CIAM",
        "externalDocs": "http://externalDocs.com/",
        "resources": {
            "openapi": "3.0.0",
            "info": {
                "title": "Gigya-CDP Connector",
                "version": "1"
            },
            "paths": {
                "/accounts.setAccountInfo": {
                    "post": {
                        "tags": [
                            "Actions"
                        ],
                        "requestBody": {
                            "content": {
                                "application/x-www-form-urlencoded": {
                                    "schema": {
                                        "$ref": "#/components/schemas/gigyaSchema"
                                    }
                                }
                            }
                        },
                        "responses": {
                            "200": {
                                "description": "OK"
                            }
                        }
                    }
                },
                "/accounts.importAccount": {
                    "post": {
                        "tags": [
                            "Actions"
                        ],
                        "summary": "Import accounts",
                        "requestBody": {
                            "required": true,
                            "content": {
                                "application/x-www-form-urlencoded": {
                                    "schema": {
                                        "$ref": "#/components/schemas/gigyaSchema"
                                    }
                                }
                            }
                        },
                        "responses": {
                            "200": {
                                "description": "OK"
                            }
                        }
                    }
                },
                "/accounts.search": {
                    "get": {
                        "tags": [
                            "Events"
                        ],
                        "summary": "Search with a query",
                        "parameters": [
                            {
                                "in": "query",
                                "name": "query",
                                "schema": {
                                    "type": "string",
                                    "default": "select * where updated > '${lastRunTime:UNIX}'"
                                },
                                "required": true,
                                "description": "the query to use to filter the account store"
                            },
                            {
                                in: "query",
                                name: "baryo",
                                schema: {
                                    type: "string",
                                    default: "$var1"
                                }
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "Successful operation",
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "type": "object",
                                            "properties": {
                                                "results": {
                                                    "type": "array",
                                                    "items": {
                                                        "$ref": "#/components/schemas/gigyaSchema"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "/accounts.stream.create": {
                    "get": {
                        "tags": [
                            "Helper"
                        ],
                        "summary": "creates stream",
                        "operationId": "createCursor",
                        "description": "Get a cursor points the stream with the spacific options\n",
                        "parameters": [
                            {
                                "in": "query",
                                "name": "query",
                                "description": "pass an optional search string for looking up in events",
                                "required": false,
                                "example": "select * from changelog where operation in (merge,move,upsert)",
                                "schema": {
                                    "type": "string",
                                    "default": "select * from changelog"
                                }
                            },
                            {
                                "in": "query",
                                "name": "since",
                                "description": "Unix time, represent earliest time of events in UTC, limited to now-30d",
                                "example": 1583769144833,
                                "required": false,
                                "schema": {
                                    "type": "integer",
                                    "default": "Unix of (now-10m)"
                                }
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "cursor for search results matching criteria",
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "$ref": "#/components/schemas/Stream"
                                        }
                                    }
                                }
                            },
                            "400": {
                                "description": "bad input parameter"
                            }
                        }
                    }
                },
                "/accounts.stream.read": {
                    "get": {
                        "tags": [
                            "Events"
                        ],
                        "summary": "fetch next batch",
                        "description": "fetch next batch",
                        "operationId": "read",
                        "parameters": [
                            {
                                "in": "query",
                                "name": "cusrsorId",
                                "description": "cusrsorId for fetching next results",
                                "required": true,
                                "schema": {
                                    "type": "string"
                                }
                            },
                            {
                                "in": "query",
                                "name": "limit",
                                "description": "results count limit",
                                "required": false,
                                "schema": {
                                    "type": "integer",
                                    "minimum": 0,
                                    "maximum": 300,
                                    "default": 100
                                }
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "ok",
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "$ref": "#/components/schemas/Batch"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "servers": [
                {
                    "url": "$baseUrl"
                }
            ],
            "components": {
                "schemas": {
                    "Batch": {
                        "properties": {
                            "nextCursorId": {
                                "type": "string",
                                "example": "ZHNhc2RmZGFnZHNmZ3NkZ2Zkc2dmZGdkc2dzZGZn"
                            },
                            "results": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/Event"
                                }
                            }
                        }
                    },
                    "Stream": {
                        "type": "object",
                        "properties": {
                            "streamId": {
                                "type": "string",
                                "example": "d290f1ee-6c54-4b01-90e6-d701748f0851"
                            },
                            "cursorId": {
                                "type": "string",
                                "example": "ZHNhc2RmZGFnZHNmZ3NkZ2Zkc2dmZGdkc2dzZGZn"
                            }
                        }
                    },
                    "Event": {
                        "type": "object",
                        "properties": {
                            "type": {
                                "type": "string",
                                "example": "merge"
                            },
                            "UID": {
                                "type": "string",
                                "example": "123"
                            },
                            "details": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/change-details"
                                },
                                "example": [
                                    {
                                        "op": "replace",
                                        "path": "/accountType",
                                        "value": "full"
                                    },
                                    {
                                        "op": "replace",
                                        "path": "/uid",
                                        "value": "456",
                                        "oldValue": "123"
                                    }
                                ]
                            }
                        }
                    },
                    "change-details": {
                        "type": "object",
                        "properties": {
                            "op": {
                                "type": "string",
                                "example": "replace"
                            },
                            "path": {
                                "type": "string",
                                "example": "/uid"
                            },
                            "value": {
                                "type": "string",
                                "example": "new-uid"
                            },
                            "oldValue": {
                                "type": "string",
                                "example": "old-uid"
                            }
                        }
                    },
                    "gigyaSchema": {
                        "properties": {
                            "profile": {
                                "type": "object",
                                "properties": {
                                    "firstName": {
                                        "type": "string"
                                    },
                                    "lastName": {
                                        "type": "string"
                                    },
                                    "nickname": {
                                        "type": "string"
                                    },
                                    "address": {
                                        "type": "string"
                                    },
                                    "age": {
                                        "type": "integer"
                                    },
                                    "bio": {
                                        "type": "string"
                                    },
                                    "birthDay": {
                                        "type": "integer"
                                    },
                                    "birthMonth": {
                                        "type": "integer"
                                    },
                                    "birthYear": {
                                        "type": "integer"
                                    },
                                    "capabilities": {
                                        "type": "object",
                                        "properties": {
                                            "login": {
                                                "type": "boolean"
                                            },
                                            "notifications": {
                                                "type": "boolean"
                                            },
                                            "actions": {
                                                "type": "boolean"
                                            },
                                            "friends": {
                                                "type": "boolean"
                                            },
                                            "status": {
                                                "type": "boolean"
                                            },
                                            "contacts": {
                                                "type": "boolean"
                                            },
                                            "photos": {
                                                "type": "boolean"
                                            }
                                        }
                                    },
                                    "certifications": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string"
                                                },
                                                "authority": {
                                                    "type": "string"
                                                },
                                                "number": {
                                                    "type": "string"
                                                },
                                                "startDate": {
                                                    "type": "string"
                                                },
                                                "endDate": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    },
                                    "city": {
                                        "type": "string"
                                    },
                                    "country": {
                                        "type": "string"
                                    },
                                    "education": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "school": {
                                                    "type": "string"
                                                },
                                                "schoolType": {
                                                    "type": "string"
                                                },
                                                "fieldOfStudy": {
                                                    "type": "string"
                                                },
                                                "degree": {
                                                    "type": "string"
                                                },
                                                "startYear": {
                                                    "type": "string"
                                                },
                                                "endYear": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    },
                                    "educationLevel": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string"
                                    },
                                    "favorites": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "interests": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "type": "string"
                                                        },
                                                        "name": {
                                                            "type": "string"
                                                        },
                                                        "category": {
                                                            "type": "string"
                                                        }
                                                    }
                                                },
                                                "activities": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "type": "string"
                                                        },
                                                        "name": {
                                                            "type": "string"
                                                        },
                                                        "category": {
                                                            "type": "string"
                                                        }
                                                    }
                                                },
                                                "books": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "type": "string"
                                                        },
                                                        "name": {
                                                            "type": "string"
                                                        },
                                                        "category": {
                                                            "type": "string"
                                                        }
                                                    }
                                                },
                                                "music": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "type": "string"
                                                        },
                                                        "name": {
                                                            "type": "string"
                                                        },
                                                        "category": {
                                                            "type": "string"
                                                        }
                                                    }
                                                },
                                                "television": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "type": "string"
                                                        },
                                                        "name": {
                                                            "type": "string"
                                                        },
                                                        "category": {
                                                            "type": "string"
                                                        }
                                                    }
                                                },
                                                "movies": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "type": "string"
                                                        },
                                                        "name": {
                                                            "type": "string"
                                                        },
                                                        "category": {
                                                            "type": "string"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "followersCount": {
                                        "type": "integer"
                                    },
                                    "followingCount": {
                                        "type": "integer"
                                    },
                                    "gender": {
                                        "type": "string"
                                    },
                                    "hometown": {
                                        "type": "string"
                                    },
                                    "industry": {
                                        "type": "string"
                                    },
                                    "interestedIn": {
                                        "type": "string"
                                    },
                                    "interests": {
                                        "type": "string"
                                    },
                                    "languages": {
                                        "type": "string"
                                    },
                                    "likes": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "type": "string"
                                                },
                                                "category": {
                                                    "type": "string"
                                                },
                                                "id": {
                                                    "type": "string"
                                                },
                                                "time": {
                                                    "type": "string"
                                                },
                                                "timestamp": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    },
                                    "locale": {
                                        "type": "string"
                                    },
                                    "patents": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "title": {
                                                    "type": "string"
                                                },
                                                "summary": {
                                                    "type": "string"
                                                },
                                                "number": {
                                                    "type": "string"
                                                },
                                                "office": {
                                                    "type": "string"
                                                },
                                                "status": {
                                                    "type": "string"
                                                },
                                                "date": {
                                                    "type": "string"
                                                },
                                                "url": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    },
                                    "phones": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": {
                                                    "type": "string"
                                                },
                                                "number": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    },
                                    "photoURL": {
                                        "type": "string"
                                    },
                                    "politicalView": {
                                        "type": "string"
                                    },
                                    "professionalHeadline": {
                                        "type": "string"
                                    },
                                    "profileURL": {
                                        "type": "string"
                                    },
                                    "publications": {
                                        "type": "string"
                                    },
                                    "relationshipStatus": {
                                        "type": "string"
                                    },
                                    "religion": {
                                        "type": "string"
                                    },
                                    "skills": {
                                        "type": "string"
                                    },
                                    "specialities": {
                                        "type": "string"
                                    },
                                    "state": {
                                        "type": "string"
                                    },
                                    "timezone": {
                                        "type": "string"
                                    },
                                    "thumbnailURL": {
                                        "type": "string"
                                    },
                                    "UID": {
                                        "type": "string"
                                    },
                                    "username": {
                                        "type": "string"
                                    },
                                    "isVerified": {
                                        "type": "string"
                                    },
                                    "verified": {
                                        "type": "string"
                                    },
                                    "work": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "company": {
                                                    "type": "string"
                                                },
                                                "companyID": {
                                                    "type": "string"
                                                },
                                                "title": {
                                                    "type": "string"
                                                },
                                                "companySize": {
                                                    "type": "string"
                                                },
                                                "startDate": {
                                                    "type": "string"
                                                },
                                                "endDate": {
                                                    "type": "string"
                                                },
                                                "industry": {
                                                    "type": "string"
                                                },
                                                "isCurrent": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    },
                                    "zip": {
                                        "type": "string"
                                    }
                                }
                            },
                            "data": {
                                "type": "object"
                            },
                            "subscriptions": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "externalId": {
                                            "type": "string"
                                        },
                                        "status": {
                                            "type": "string"
                                        },
                                        "date": {
                                            "type": "string"
                                        },
                                        "channelType": {
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            "preferences": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "externalId": {
                                            "type": "string"
                                        },
                                        "status": {
                                            "type": "string"
                                        },
                                        "date": {
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            "username": {
                                "type": "string"
                            },
                            "UID": {
                                "type": "string"
                            },
                            "isLite": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        },
        "type": "Rest",
        "preDefinedActions": [
            {
                "name": "Update Account in Gigya CIAM",
                "resourcePath": "/accounts.setAccountInfo/post",
                "id": "HJq-Ry7m0KnAX7vYcjjmMg"
            }
        ],
        "preDefinedEvents": [
            {
                "name": "Get new Accounts from Gigya CIAM",
                "resourcePath": "/accounts.search/get",
                "configValues": {},
                "id": "HCinvmdWMpQP52icxCpbaw"
            }
        ],
        "configSchema": {
            "type": "object",
            "allowAdditionalProperties": false,
            "required": [
                "baseUrl"
            ],
            "properties": {
                "var1": {
                  type: "string",
                  default: "123"
                },
                "baseUrl": {
                    "type": "string",
                    "title": "Base Url",
                    "description": "The Gigya base url for the Data-centre to use",
                    "scopes": [
                        "application"
                    ]
                },
                "lastRunTime": {
                    "type": "_lastRunTime"
                }
            }
        },
        "securitySchemes": {
            "gigyaAuth": {
                "type": "object",
                "allowAdditionalProperties": false,
                "required": [
                    "userKey",
                    "secret",
                    "apiKey"
                ],
                "properties": {
                    "userKey": {
                        "title": "User Key",
                        "description": "The user key to use for authentication",
                        "type": "string",
                        "in": "query"
                    },
                    "secret": {
                        "title": "Secret",
                        "description": "The secret key to use for authentication",
                        "type": "string",
                        "in": "query"
                    },
                    "apiKey": {
                        "title": "API Key",
                        "description": "The api key of the site to use for authentication",
                        "type": "string",
                        "in": "query"
                    }
                }
            }
        },
        "pollingConfigurations": {
            "/accounts.search/get": {
                "recordsLocator": "results",
                "pageSizeFieldName": "bla",
                "dateFieldName": "bla",
            }
        }
    }
