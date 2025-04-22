import { useState } from "react";
import NoteCard from "../components/note-card";
import { db } from "../infrastructure/appwrite/db";
import { useNotes } from "../hooks/useNotes";
import ControllPannel from "../components/control-pannel";
import { noteColorPalette } from "../assets/colors";
import { NoteColor } from "../types/note";

const NotesPage = () => {
  const { notes, setNotes, activeNoteId, setActiveNoteId } = useNotes();

  const [thinkingNote, setThinkingNote] = useState<string | null>(null);

  const handleNoteActivate = (id: string) => {
    setActiveNoteId(id);
  };

  const handleNotePositionChange = async (
    id: string,
    position: { x: number; y: number }
  ) => {
    setThinkingNote(id);
    await db.notes.update(id, {
      position: {
        x: position.x,
        y: position.y,
      },
    });

    setThinkingNote(null);
  };

  const handleNoteDelete = async (id: string) => {
    setThinkingNote(id);
    await db.notes.delete(id);
    setNotes(notes.filter((note) => note.$id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(null);
    }

    setThinkingNote(null);
  };

  const handleAddNote = async () => {
    // Generate random position within viewport
    const margin = 150; // Keep notes away from the edges
    const randomX =
      Math.floor(Math.random() * (window.innerWidth - margin * 2)) + margin;
    const randomY =
      Math.floor(Math.random() * (window.innerHeight - margin * 2)) + margin;

    const payload = {
      body: "",
      position: {
        x: randomX,
        y: randomY,
      },
      colors:
        noteColorPalette[Math.floor(Math.random() * noteColorPalette.length)],
    };

    const newNote = await db.notes.create(payload);
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setActiveNoteId(newNote.$id);
  };

  const handleChangeColor = async (color: NoteColor) => {
    if (!activeNoteId) return;

    setThinkingNote(activeNoteId);
    await db.notes.update(activeNoteId, {
      colors: color,
    });
    setThinkingNote(null);

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.$id === activeNoteId ? { ...note, colors: color } : note
      )
    );
  };

  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note.$id}
          note={note}
          isActive={activeNoteId === note.$id}
          isProcessing={thinkingNote === note.$id}
          onActivate={() => handleNoteActivate(note.$id)}
          onPositionChange={handleNotePositionChange}
          onStartTyping={(id) => {
            setThinkingNote(id);
            setActiveNoteId(id);
          }}
          onTypingComplete={(id, body) => {
            console.log("Saving body", id, body);
            db.notes.update(id, { body });
            setThinkingNote(null);
          }}
          onDelete={handleNoteDelete}
        />
      ))}
      <ControllPannel
        onAddNote={handleAddNote}
        onChangeColor={handleChangeColor}
      />
    </div>
  );
};

export default NotesPage;
