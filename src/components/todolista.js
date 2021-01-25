
export function TodoLista({ todos, completeTodo, removeTodo }) {
   
    return todos.map((todo, index) => (
        <div className={todo.done ? 'todo-row-complete' : 'todo-row'}
            key={index}>
            <div key={todo.label} onClick={() => completeTodo(todo.label)}>
                {todo.label}
            </div>
            <div 
            className="delete-icons">
            <i class="fas fa-times" 
            onClick={()=> removeTodo(todo.label)}></i>
            </div>
        </div>
    ))
}