import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  deleteTodo: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, deleteTodo }) => {

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-list__item">
          <button type="button" onClick={() => deleteTodo(todo.id)}>X</button>
          <p>{todo.title}</p>
          <p>{todo.user?.name}</p>
          <input type="checkbox" checked={todo.completed}/>
        </li>
      ))}
    </ul>
  );
};
