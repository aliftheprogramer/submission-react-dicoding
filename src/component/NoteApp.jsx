import React from "react";
import FormBody from "./FormBody";
import NoteList from "./NoteList";
import Header from "./Header";

class NoteApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            searchQuery: "",
            editingNote: null
        };

        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
        this.onArchiveNoteHandler = this.onArchiveNoteHandler.bind(this);
        this.onUnarchiveNoteHandler = this.onUnarchiveNoteHandler.bind(this);
        this.onSearchNoteHandler = this.onSearchNoteHandler.bind(this);
        this.onEditNoteHandler = this.onEditNoteHandler.bind(this);
        this.onUpdateNoteHandler = this.onUpdateNoteHandler.bind(this);
        this.onCancelEditHandler = this.onCancelEditHandler.bind(this);
    }

    onAddNoteHandler({ title, description }) {
        console.log("Adding note:", { title, description });
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        description,
                        date: new Date().toLocaleDateString(),
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

    onSearchNoteHandler(query) {
        this.setState({ searchQuery: query });
    }

    onEditNoteHandler(note) {
        this.setState({ editingNote: note });
    }

    onUpdateNoteHandler(updatedNote) {
        this.setState((prevState) => {
            return {
                notes: prevState.notes.map((note) =>
                    note.id === updatedNote.id ? updatedNote : note
                ),
                editingNote: null
            };
        });
    }

    onCancelEditHandler() {
        this.setState({ editingNote: null });
    }

    render() {
        const { notes, searchQuery, editingNote } = this.state;
        const filteredNotes = notes.filter((note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const activeNotes = filteredNotes.filter((note) => !note.isArchive);
        const archivedNotes = filteredNotes.filter((note) => note.isArchive);

        return (
            <>
                <Header onSearch={this.onSearchNoteHandler} />
                <div className="container mx-auto p-4">
                    <FormBody addNote={this.onAddNoteHandler} />
                    <h2 className="text-xl font-semibold mt-8 mb-4">Catatan Saya</h2>
                    <div className="flex justify-center flex-wrap">
                        <NoteList notes={activeNotes} onDelete={this.onDeleteNoteHandler} onArchive={this.onArchiveNoteHandler} onEdit={this.onEditNoteHandler} />
                    </div>
                    <h2 className="text-xl font-semibold mt-8 mb-4">Catatan Saya yang Diarsipkan</h2>
                    <div className="flex flex-wrap justify-center">
                        <NoteList notes={archivedNotes} onDelete={this.onDeleteNoteHandler} onArchive={this.onUnarchiveNoteHandler} onEdit={this.onEditNoteHandler} />
                    </div>
                    {editingNote && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded max-w-lg w-full">
                                <h2 className="text-xl font-semibold mb-4">Edit Catatan</h2>
                                <FormBody addNote={this.onUpdateNoteHandler} note={editingNote} />
                                <button className="mt-4 bg-red-500 text-white p-2 rounded" onClick={this.onCancelEditHandler}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default NoteApp;