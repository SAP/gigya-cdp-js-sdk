export type DateRange = AllTimeRange | WithinTheLastRange | SinceRange;

interface AllTimeRange {
    method: 'allTime';
}

interface WithinTheLastRange {
    method: 'withinTheLast';
    range: number;
    type: 'days';
}

interface SinceRange {
    method: 'since';
    since: Date;
}
