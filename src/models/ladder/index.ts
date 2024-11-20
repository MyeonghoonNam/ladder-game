export type Ladder = LadderFootStool[][];
export type LadderFootStool = '---' | '\\-\\' | '/-/' | '';

export interface LadderContactPoint {
  coords: {
    x: number;
    y: number;
  };
  verticalLineIdx: number;
  connectedPointCoords: {
    x: number;
    y: number;
  };
  contactedVerticalLineIdx: number;
}

export interface LadderSelectedInput {
  selectedInputLineIdx: number;
  selectedInputIdx: number;
}
