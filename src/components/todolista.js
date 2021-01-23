
export function TodoLista({ todos, completeTodo, removeTodo }) {
   
    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row-complete' : 'todo-row'}
            key={index}>
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            <div 
            className="delete-icons">
            <i class="fas fa-times" 
            onClick={()=> removeTodo(todo.id)}></i>
            </div>
        </div>
    ))
}