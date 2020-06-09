import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import { getTodos, getUsers } from './helpers/api';
import {
  initTodos,
  startLoading,
  finishLoading,
  sortByName,
  sortByStatus,
  sortByTitle,
  deleteTodo,
  RootState
} from './store/index';

import { Buttons } from './components/Buttons/Buttons';
import { TodoList } from './components/TodoList/TodoList';

export const getAppData = async (): Promise<Todo[]> => {
  const todosFromServer = await getTodos();
  const usersFromServer = await getUsers();

  return todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }));
};

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const isLoading = useSelector((state: RootState) => state.isLoading);

  const initData = () => {
    dispatch(startLoading());

    getAppData()
      .then(todosFromServer => {
        const action = initTodos(todosFromServer);

        dispatch(action);
      })
      .finally(() => dispatch(finishLoading()));
  };

  const handleSortByTitle = () => {
    dispatch(sortByTitle());
  };

  const handleSortByName = () => {
    dispatch(sortByName());
  };

  const handleSortByStatus = () => {
    dispatch(sortByStatus());
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <Buttons
        isLoading={isLoading}
        initData={initData}
        sortByName={handleSortByName}
        sortByStatus={handleSortByStatus}
        sortByTitle={handleSortByTitle}
      />
      <TodoList
        todos={todos}
        deleteTodo={handleDeleteTodo}
      />
    </div>
  );
};

export default App;
