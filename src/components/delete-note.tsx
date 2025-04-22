import Trash from "./ui/icons/Trash";

interface DeleteNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function DeleteNote({ size = 24, ...props }: DeleteNoteProps) {
  return (
    <div {...props}>
      <Trash size={size} />
    </div>
  );
}

export default DeleteNote;
