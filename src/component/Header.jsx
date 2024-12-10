import React from "react";

function Header({ onSearch }){
    return(
        <header className="bg-blue-500  p-4">
            <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Simple Note App</h1>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="p-2 rounded"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

        </header>
    );
}

export default Header;