import React from "react";

function Note({ title, date, desc, isArchive, onDelete, onArchive, onEdit }) {
    console.log("Note component:", { title, date, desc, isArchive });
    return (
        <div className="p-4 border rounded-lg shadow-md mb-4 w-80 mx-6 my-6 flex flex-col justify-between" onClick={onEdit}>
            <div>
                <div className="mb-2">
                    <h1 className="font-bold text-lg text-right">{title}</h1>
                    <p className="text-sm text-gray-500 text-right">{date}</p>
                </div>
                <p className="mb-4">{desc}</p>
            </div>
            <div className="space-y-2 mt-auto">
                <button className="bg-red-500 text-white w-full px-2 py-1 rounded" onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>
                <button className="bg-green-500 text-white w-full px-2 py-1 rounded" onClick={(e) => { e.stopPropagation(); onArchive(); }}>
                    {isArchive ? "Unarchive" : "Archive"}
                </button>
            </div>
        </div>
    );
}

export default Note;