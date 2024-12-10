import React from "react";

class NoteInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title: props.note ? props.note.title : "",
            description: props.note ? props.note.description : ""
        }

        this.onTitleChangeNoteHandler = this.onTitleChangeNoteHandler.bind(this);
        this.onDescriptionChangeNoteHandler = this.onDescriptionChangeNoteHandler.bind(this);
        this.onSubmitNoteHandler = this.onSubmitNoteHandler.bind(this);
    }


    onTitleChangeNoteHandler(event) {
        const title = event.target.value;
        if(title.length <= 50){
            this.setState({ title});
        }
    }

    onDescriptionChangeNoteHandler(event) {
        this.setState({ description: event.target.value });
    }


    onSubmitNoteHandler(event) {
        event.preventDefault();
        this.props.addNote({
            id: this.props.note ? this.props.note.id : +new Date(),
            title: this.state.title,
            description: this.state.description,
            isArchive: this.props.note ? this.props.note.isArchive : false
        });
        this.setState({ title: "", description: "" }); // Reset form after submission
    }



    render() {
        return (
            <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Buat Catatan Baru</h1>
                <form className="flex flex-col items-center w-full mt-10" onSubmit={this.onSubmitNoteHandler}>
                <p className="text-blue-600 mb-2">sisa char: 
                {50 - this.state.title.length}
                </p>
                <input
                type="text"
                placeholder="Judul"
                className="pb-5 rounded-md border-2 border-blue-400 p-2 mb-4 w-full"
                value={this.state.title}
                onChange={this.onTitleChangeNoteHandler}
                />
                <textarea
                placeholder="Deskripsi"
                className="rounded-md border-2 border-blue-400 p-2 mb-4 w-full h-40"
                value={this.state.description}
                onChange={this.onDescriptionChangeNoteHandler}
                />
                <button type="submit" className="mt-5 bg-blue-500 text-white p-2 rounded-full">Submit</button>
                </form>
            </div>
            </div>
        );
    }
};

export default NoteInput;