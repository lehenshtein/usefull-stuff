export type MatrixBlockType = 'default' | 'non-reachable';
export type MatrixVisaulType = 'checked' | 'source' | 'destination' | 'unchecked';
export interface IMatrixBlock {
  id: string,
  type: MatrixBlockType,
  visual: MatrixVisaulType,
  coordinates: IVector2D
}

export interface IVector2D {
  x: number,
  y: number
}
