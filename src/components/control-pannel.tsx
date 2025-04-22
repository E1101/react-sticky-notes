import { noteColorPalette } from "../assets/colors";
import { NoteColor } from "../types/note";
import AddNote from "./add-note";
import ColorPicker from "./color-picker";

import styles from "./control-pannel.module.css";

type Props = {
  onAddNote: () => void;
  onChangeColor: (color: NoteColor) => void;
};

function ControllPannel({ onAddNote, onChangeColor }: Props) {
  return (
    <div className={styles.controls}>
      <AddNote onClick={onAddNote} />
      {noteColorPalette.map((color, index) => (
        <ColorPicker
          noteColor={color}
          key={index}
          onClick={() => onChangeColor(color)}
        />
      ))}
    </div>
  );
}

export default ControllPannel;
