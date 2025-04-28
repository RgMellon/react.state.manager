import { ITodo } from '../entities/ITodo';
import { IUser } from '../entities/IUser';

import { createStore } from './cretateStore';

interface IGlobalStore {
  user: IUser | null;
  todos: ITodo[];
  login: () => void;
  logout: () => void;
}

export const globalStore = createStore<IGlobalStore>((setState) => ({
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
}));
