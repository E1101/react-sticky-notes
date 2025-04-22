export interface NoteColor {
  id: string;
  colorHeader: string;
  colorBody: string;
  colorText: string;
}

export interface NotePosition {
  x: number;
  y: number;
}

export interface Note {
  $id: string;
  body: string;
  colors: NoteColor;
  position: NotePosition;
}
