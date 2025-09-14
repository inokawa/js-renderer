export interface ViewStyle {
  readonly width?: number; // | `${number}%` | undefined;
  readonly height?: number; // | `${number}%` | undefined;
  readonly flexDirection?: "row" | "column";
  readonly justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  readonly alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
  readonly alignSelf?: "flex-start" | "center" | "flex-end" | "stretch";
  readonly flex?: number;
  readonly position?: "absolute" | "relative";
  readonly gap?: number;
  readonly zIndex?: number;
  readonly display?: "flex" | "none";
  readonly top?: number;
  readonly left?: number;
  readonly right?: number;
  readonly bottom?: number;
  // readonly padding?: number;
  // readonly paddingHorizontal?: number;
  // readonly paddingVertical?: number;
  readonly paddingLeft?: number;
  readonly paddingRight?: number;
  readonly paddingTop?: number;
  readonly paddingBottom?: number;
  // readonly margin?: number;
  // readonly marginHorizontal?: number;
  // readonly marginVertical?: number;
  readonly marginLeft?: number;
  readonly marginRight?: number;
  readonly marginTop?: number;
  readonly marginBottom?: number;
  // The only value not related to layout.
  readonly backgroundColor?: string;
}

export interface TextStyle extends ViewStyle {
  readonly fontSize?: number;
  readonly color?: string;
}

interface DrawCommon {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly zIndex: number;
}

export interface ViewDraw extends DrawCommon {
  readonly backgroundColor: string;
}

export interface TextDraw extends DrawCommon {
  readonly text: string;
  readonly color: string;
  readonly fontSize: number;
}

export type Draw = ViewDraw | TextDraw;
