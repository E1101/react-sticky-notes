import { NoteColor } from "../types/note";
import styles from "./color-picker.module.css";

interface ColorPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  noteColor: NoteColor;
}

function ColorPicker({ noteColor, ...props }: ColorPickerProps) {
  const { colorHeader } = noteColor;
  const classes = props.className
    ? `${styles.color} ${props.className}`
    : styles.color;

  return (
    <div
      className={classes}
      {...props}
      style={{ backgroundColor: colorHeader }}
    ></div>
  );
}

export default ColorPicker;
