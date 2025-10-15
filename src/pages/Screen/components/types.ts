export type Seat = { number: number; x: number; y: number; selected?: boolean; label?: string };
export type Row = { row: string; seats: Seat[] };
export type Block = { blockName: string; priceAdjustment: number; rows: number; cols: number; layout: Row[] };
