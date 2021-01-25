import React, { useState } from 'react'


export function Contenedor(props) {
    const [input, setInput] = useState('');

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            label: input,
            done: false
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