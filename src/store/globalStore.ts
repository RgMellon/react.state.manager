import { ITodo } from '../entities/ITodo';
import { IUser } from '../entities/IUser';

import { createStore } from './cretateStore';

interface IGlobalStore {
  user: IUser | null;
  todos: ITodo[];
  login: () => void;
  logout: () => void;
  addTodo(title: string, author?: string): void;
}

export const globalStore = createStore<IGlobalStore>((setState, getState) => ({
  todos: [],
  user: null,
  login: () =>
    setState({
      user: {
        email: 'rgmelo',
        name: 'Renan',
      },
    }),

  logout: () => {
    setState({
      user: null,
    });
  },

  addTodo: (title) => {
    setState((prevState) => ({
      todos: prevState.todos.concat({
        id: Date.now(),
        title,
        author: getState().user?.name ?? 'Convidado',
        done: false,
      }),
    }));
  },
}));
