export type NonEmptyArray<T> = readonly [T, ...T[]];

export interface Coords {
  x: number;
  y: number;
}
