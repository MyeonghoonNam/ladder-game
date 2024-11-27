import { type Coords } from 'models/common';

export type Ladder = LadderFootStool[][];
export type LadderFootStool = '|' | '---' | '\\-\\' | '/-/' | '';

export interface LadderConnectedPoint {
  coords: Coords;
  verticalLineIdx: number;
  connectedPointCoords: Coords;
  connectedPointVerticalLineIdx: number;
}

export interface LadderSelectedInput {
  selectedInputLineIdx: number;
  selectedInputIdx: number;
}

export interface LadderGameResult {
  start: string;
  end: string;
}
