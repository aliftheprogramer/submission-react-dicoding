import React from "react";
import Note from "./Note";

function NoteList({ notes, onDelete, onArchive }) {
    return (
        <div className="grid grid-cols-3 gap-3">
            {notes.map((note) => (
                <Note
                    isArchive={note.isArchive}
                    title={note.title}
                    desc={note.description}
                    date={note.date}
                    onDelete={() => onDelete(note.id)}
                    onArchive={() => onArchive(note.id)}
                    key={note.id}
                />
            ))}
        </div>
    );
}
export default NoteList;
