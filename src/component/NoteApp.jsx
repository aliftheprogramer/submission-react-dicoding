import React from "react";

import FormBody from "./FormBody";
import NoteList from "./NoteList";

class NoteApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notes: [],
        }

        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
        this.onUnarchiveNoteHandler = this.onUnarchiveNoteHandler.bind(this);
    }

    onAddNoteHandler({ title, description }) {
        console.log("Adding note:", { title, description });
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        date: new Date().toLocaleString(),
                        title,
                        description,
                        isArchive: false
                    }
                ]
            };
        });
    }

    onDeleteNoteHandler(id) {
        this.setState((prevState) => {
            return {
                notes: prevState.notes.filter((note) => note.id !== id)
            };
        });
    }

    onArchiveNoteHandler(id) {
        this.setState((prevState) => {
            return {
                notes: prevState.notes.map((note) =>
                    note.id === id ? { ...note, isArchive: true } : note
                )
            };
        });
    }

    onUnarchiveNoteHandler(id) {
        this.setState((prevState) => {
            return {
                notes: prevState.notes.map((note) =>
                    note.id === id ? { ...note, isArchive: false } : note
                )
            };
        });
    }


    render() {
        const activeNotes = this.state.notes.filter((note) => !note.isArchive);
        const archivedNotes = this.state.notes.filter((note) => note.isArchive);

        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Buat Catatan Baru</h1>
                <FormBody addNote={this.onAddNoteHandler} />
                <h2 className="text-xl font-semibold mt-8 mb-4">Catatan Saya</h2>
                <div className="flex justify-center flex-wrap">
                    <NoteList notes={activeNotes} onDelete={this.onDeleteNoteHandler} onArchive={this.onArchiveNoteHandler} />
                </div>
                <h2 className="text-xl font-semibold mt-8 mb-4">Catatan Saya yang Diarsipkan</h2>
                <div className="flex flex-wrap justify-center">
                    <NoteList notes={archivedNotes} onDelete={this.onDeleteNoteHandler} onArchive={this.onUnarchiveNoteHandler} />
                </div>
            </div>
        );
    }

}

export default NoteApp;