import React, { useEffect, useState, } from 'react'
import { Contenedor } from './contenedor'
import { TodoLista } from './todolista';

const userName = 'Hasthon';
const endPoint = 'https://assets.breatheco.de/apis/fake/todos/user';

export function Lista() {
    const [todos, setTodos] = useState([]);

    const crearTarea = () => {
        return new Promise((resolve, reject) => {
            fetch(`${endPoint}/${userName}`, { /* FETCH NUEVA PROMESA CON POST*/ 
                method: "POST",
                body: "[]",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    console.error(error);
                    reject(error)
                });
        })
    }

    const traeTareas = () => {
        fetch(`${endPoint}/${userName}`, { /* FETCH METODO GET PARA  RECIBIR INFO DESDE API*/ 
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                if (resp.status === 404) {
                    crearTarea()
                    return null;
                }
                return resp.json();
            })
            .then(data => {
                if (data) {
                    console.log(data);
                    setTodos(data)
                }
            })
            .catch(error => {
                //manejo de errores
                alert('No fue posible leer tarea')
                console.error(error);
            });
    }

    const eliminaTareas = () => {
        fetch(`${endPoint}/${userName}`, { /* FETCH METODO DELETE PARA ELIMINAR TASK Y USUARIO*/ 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                alert("Se eliminaron todas las tareas")
                setTodos([])
            })
            .catch(error => {
                //manejo de errores
                alert('No fue posible emilinar tarea')
                console.error(error);
            });
    }

    const actualizaTareas = (tareas) => {
        if (tareas.length <= 0) {
            eliminaTareas();
            return;
        }
        fetch(`${endPoint}/${userName}`, { /* FETCH METODO PUT PARA ACTUALIZAR LAS TAREAS*/ 
            method: "PUT",
            body: JSON.stringify(tareas),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async resp => {
                if (resp.status === 404) {
                    await crearTarea();
                    actualizaTareas(tareas);
                    return null;
                } else {
                    return resp.json();
                }
            })
            .then(data => {
                if (data) {
                    console.log(data);
                    setTodos(tareas);
                    alert(data.result)
                }
            })
            .catch(error => {
                //manejo de errores
                alert('No fue posible editar tareas')
                console.error(error);
            });
    }
    useEffect(() => {   
        traeTareas();
    }, [])

    const AddTodo = todo => {
        if (!todo.label || /^\s*$/.test(todo.label)) {
            return;
        }

        const newTodos = [todo, ...todos]

        actualizaTareas(newTodos)
    }

    const removeTodo = label => {
        const removeArr = [...todos].filter(todo => todo.label !== label)
        actualizaTareas(removeArr)
    }

    const removeAlltasks = () => {
        actualizaTareas([])
    }


    const completeTodo = label => {
        let updatedTodos = todos.map(todo => {
            if (todo.label === label) {
                todo.done = !todo.done
            }
            return todo;
        })
        actualizaTareas(updatedTodos)
    }
    return (
        <div>
            <h1>TAREAS PENDIENTES <i class="far fa-edit"></i></h1>
            <Contenedor onSubmit={AddTodo} />
            <TodoLista
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo} />
            <div className="borrar-todo">
                <i class="far fa-trash-alt"
                    onClick={removeAlltasks}></i>
            </div>
        </div>
    )
}


