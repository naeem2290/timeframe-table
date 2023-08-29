export interface SlotRow {
    timePeriod : string,
    sunday : Day | null,
    monday : Day | null,
    tuesday : Day | null,
    wednesday : Day | null,
    thursday : Day | null,
    friday : Day | null,
    saturday : Day | null
}

export interface Day {
    date: string | null,
    value: number | null
}