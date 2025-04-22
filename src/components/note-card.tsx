import { Note } from "../types/note";
import styles from "./note-card.module.css";
import { useDraggable } from "../hooks/useDraggable";
import AutoGrowTextarea from "./ui/AutoGrowTextarea";
import Spinner from "./ui/icons/Spinner";
import { useRef, useState } from "react";
import DeleteNote from "./delete-note";

interface NoteCardProps {
  note: Note;
  isActive?: boolean;
  isProcessing?: boolean;
  onActivate?: () => void;
  onPositionChange?: (id: string, position: { x: number; y: number }) => void;
  onStartTyping?: (id: string) => void;
  onTypingComplete?: (id: string, body: string) => void;
  onDelete?: (id: string) => void;
}

const NoteCard = ({
  note,
  isActive = false,
  isProcessing = false,
  onActivate,
  onPositionChange,
  onStartTyping,
  onTypingComplete,
  onDelete,
}: NoteCardProps) => {
  const [body, setBody] = useState<string>(note.body);

  const initialPosition = note.position;
  const colors = note.colors;

  const keyUpTimer = useRef<number | null>(null);

  const { isDragging, dragHandleProps, style } = useDraggable({
    initialPosition,
    onPositionChange: (position) => onPositionChange?.(note.$id, position),
  });

  const handleActivate = () => {
    onActivate?.();
  };

  const handleKeyUp = () => {
    onStartTyping?.(note.$id);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      onTypingComplete?.(note.$id, body);
    }, 1000);
  };

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.cardDragging : ""} ${
        isActive ? styles.cardActive : ""
      }`}
      style={{
        backgroundColor: colors.colorBody,
        left: style.left,
        top: style.top,
        zIndex: isActive ? 100 : 1,
      }}
      onMouseDown={handleActivate}
    >
      <div
        className={styles.cardHeader}
        style={{
          backgroundColor: colors.colorHeader,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        {...dragHandleProps}
      >
        <DeleteNote
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(note.$id);
          }}
          style={{ cursor: "pointer" }}
        />
        {isProcessing && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <AutoGrowTextarea
          style={{
            color: colors.colorText,
          }}
          defaultValue={body}
          onFocus={handleActivate}
          onKeyUp={handleKeyUp}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NoteCard;
