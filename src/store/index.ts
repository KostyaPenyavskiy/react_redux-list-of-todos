import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Action types - is just a constant. MUST have a unique value.
const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const INIT_TODOS = 'INIT_TODOS';
const SORT_BY_TITLE = 'SORT_BY_TITLE';
const SORT_BY_STATUS = 'SORT_BY_STATUS';
const SORT_BY_NAME = 'SORT_BY_NAME';
const DELETE_TODO = 'DELETE_TODO';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
export const initTodos = (todos: Todo[]) => ({ type: INIT_TODOS, todos, });
export const sortByTitle = () => ({ type: SORT_BY_TITLE, });
export const sortByStatus = () => ({ type: SORT_BY_STATUS, });
export const sortByName = () => ({ type: SORT_BY_NAME, });
export const deleteTodo = (id: number) => ({type: DELETE_TODO, id,})

// Initial state
export type RootState = {
  isLoading: boolean;
  todos: Todo[];
};

const initialState: RootState = {
  isLoading: false,
  todos: [],
};

// rootReducer - this function is called after dispatching an action
const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case DELETE_TODO: 
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id), 
      };

    case SORT_BY_NAME:
      return {
        ...state,
        todos: [...state.todos].sort((a: Todo, b: Todo) => {
          if (a.user === null || b.user === null) {
            throw new Error('error');
          }

          return a.user.name.localeCompare(b.user.name)
        }),
      };

    case SORT_BY_TITLE:
      return {
        ...state,
        todos: [...state.todos].sort((a: Todo, b: Todo) => {
          if (a.user === null || b.user === null) {
            throw new Error('error');
          }

          return a.title.localeCompare(b.title)
        }),
      };

    case SORT_BY_STATUS:
      return {
        ...state,
        todos: [...state.todos].sort((a: Todo, b: Todo) => {
          if (a.user === null || b.user === null) {
            throw new Error('error');
          }

          return +a.completed - +b.completed;
        }),
      };

    case INIT_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case START_LOADING:
      return { ...state, isLoading: true };

    case FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };

    default:
      return state;
  }
};

// The `store` should be passed to the <Provider store={store}> in `/src/index.tsx`
const store = createStore(
  rootReducer,
  composeWithDevTools(), // allows you to use http://extension.remotedev.io/
);

export default store;
