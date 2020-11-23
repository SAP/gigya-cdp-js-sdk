import {BusinessUnitId} from "./BusinessUnit";

type MetricName = 'receivedEvents' | 'sentActions';
type MetricsColumn = 'sum' | 'time';
type TagName = 'view' | 'journey' | 'action' | 'status' | 'event' | 'application' | 'triggerType';

type MetricResults<T extends string> = Array<{
    tags: {
        [tagName in T]: string
    };
    values: Array<Array<string | number>>;
}>;


type MetricResponse<T extends string> = {
    columns: MetricsColumn[];
    results: MetricResults<T>;
};

interface MetricsEndpoints {
    '/api/businessunits/${bUnitId}/metrics/{metricName}?filterTags=tag1:valA,tag2:valB,tag3:valC&aggregateBy=tag4,tag5&timeGranularity=[day|month|year|alltime]': {
        GET: (bUnitId: BusinessUnitId, metricName: MetricName, filterTags: Record<TagName, string>, aggregatedBy: TagName[], timeGranularity: 'day' | 'month' | 'year' | 'alltime')
            => Promise<MetricResponse<TagName>>;
    }
}


type TimeMetric = { [time: string]: number };

interface Metrics {
    count: number;
    components?: {
        [id: string]: Metrics | TimeMetric;
    };
}

interface FilterTag<T extends string> {
    tag: T,
    val: string
}


function getMetrics<T extends string>(metricsRes: MetricResponse<T>, aggTags: T[], filterTags: FilterTag<T>[] = []) {
    const aggTag = aggTags.shift();
    if (!aggTag)
        throw 'no aggregate';

    const filteredMetrics = !filterTags.length ? [...metricsRes.results] : metricsRes.results.filter(m => filterTags.every(fTag => m.tags[fTag.tag] == fTag.val));

    if (aggTags.length)
        return {
            get count(): number {
                return Object.values(this.components ?? {})
                    .map((m: any) => 'count' in m ? m.count : 0)
                    .reduce((res, c) => (res + c), 0);
            },
            components: Array.from(new Set(filteredMetrics.map(m => m.tags[aggTag])))
                .reduce((res, tagId) => ({
                    ...res,
                    [tagId]: getMetrics<T>({
                            columns: metricsRes.columns,
                            results: filteredMetrics
                        }, [
                            ...aggTags
                        ], [
                            ...filterTags,
                            {tag: aggTag, val: tagId}
                        ]
                    )
                }), {})
        } as Metrics;
    else {
        const timeColumn = metricsRes.columns.findIndex(c => c == 'time');
        const sumColumn = metricsRes.columns.findIndex(c => c == 'sum');
        if (sumColumn < 0)
            throw 'missing sum';

        return {
            get count() {
                return Object.values((this.components ?? {}) as TimeMetric).reduce((res, c: number) => res + c, 0);
            },
            components: filteredMetrics.flatMap(m => m.values).reduce((res: TimeMetric, values) => {
                const time = values[timeColumn]?.toString() ?? 'forever';
                const sum = values[sumColumn] as number;

                return {
                    ...res,
                    [time]: (res[time] || 0) + sum
                };
            }, {}) as TimeMetric
        };
    }
}


const mResponse: MetricResponse<'view' | 'journey' | 'action' | 'status'> = {
    columns: ['time', 'sum'],
    results: [
        {
            tags: {
                view: 'v1',
                journey: 'j1',
                action: 'a1',
                status: 'success'
            },
            values: [
                ['11-01-20', 50]
            ]
        },
        {
            tags: {
                view: 'v1',
                journey: 'j1',
                action: 'a1',
                status: 'failed'
            },
            values: [
                ['11-01-20', 20]
            ]
        },
        {
            tags: {
                view: 'v1',
                journey: 'j1',
                action: 'a2',
                status: 'success'
            },
            values: [
                ['11-01-20', 20]
            ]
        },
        {
            tags: {
                view: 'v1',
                journey: 'j1',
                action: 'a2',
                status: 'failed'
            },
            values: [
                ['11-01-20', 30]
            ]
        },
        {
            tags: {
                view: 'v2',
                journey: 'j1',
                action: 'a2',
                status: 'success'
            },
            values: [
                ['11-01-20', 20]
            ]
        },
        {
            tags: {
                view: 'v2',
                journey: 'j1',
                action: 'a2',
                status: 'failed'
            },
            values: [
                ['11-01-20', 20],
                ['12-01-20', 25],
                ['13-01-20', 90],
            ]
        },
        {
            tags: {
                view: 'v3',
                journey: 'j1',
                action: 'a2',
                status: 'failed'
            },
            values: [
                ['13-01-20', 90],
            ]
        },
        // ....
    ]
};

console.log(
    JSON.stringify(
        getMetrics(mResponse, ['view', 'journey', 'action', 'status']), undefined, 4)
);
