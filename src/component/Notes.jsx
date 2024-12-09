import React from "react";
import NoteList from "./NoteList";

function MyActiveNotes({ notes, onDelete, onArchive }){
    return (
        <div className="container">
            <h1>List catatan</h1>
            <NoteList notes={notes} onDelete={onDelete} onArchive={onArchive}/>
        </div>
    )
}
export default MyActiveNotes;