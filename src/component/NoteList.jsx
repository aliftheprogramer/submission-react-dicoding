import React from "react";
import Note from "./Note";

function NoteList({ notes, onDelete, onArchive, onEdit }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {notes.map((note) => (
                <Note
                    key={note.id}
                    isArchive={note.isArchive}
                    title={note.title}
                    desc={note.description}
                    date={note.date}
                    onDelete={() => onDelete(note.id)}
                    onArchive={() => onArchive(note.id)}
                    onEdit={() => onEdit(note)}
                />
            ))}
        </div>
    );
}

export default NoteList;