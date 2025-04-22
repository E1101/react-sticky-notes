import Plus from "./ui/icons/Plus";

import styles from "./add-note.module.css";

interface AddNoteProps extends React.HTMLAttributes<HTMLDivElement> {}

function AddNote({ className, ...props }: AddNoteProps) {
  const classes = [styles.addBtn, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...props}>
      <Plus />
    </div>
  );
}

export default AddNote;
