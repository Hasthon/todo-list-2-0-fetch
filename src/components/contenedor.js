import React, { useState } from 'react'


export function  Contenedor(props) {
    const [input, setInput] = useState('');

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
        id: Math.floor(Math.random() *1000),
        text:input 
        })
        setInput('');
    }

    return (
        <>
            <form className="todo-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Aqui escribe tus tareas"
                    value={input}
                    name="text"
                    className="todo-input"
                    onChange={handleChange}
                     />
            </form>
        </>
    )
}