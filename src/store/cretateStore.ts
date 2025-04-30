import { useEffect, useState } from 'react';

type SetterFn<T> = (state: T) => Partial<T>;
type SetStateFn<T> = (partialState: Partial<T> | SetterFn<T>) => void;

export function createStore<T>(
  createState: (setStateParam: SetStateFn<T>) => T,
) {
  let state: T;

  const listeners = new Set<() => void>();

  function subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  function notifyListeners() {
    listeners.forEach((listener) => listener());
  }

  function setState(partialState: Partial<T> | SetterFn<T>) {
    const newValue =
      typeof partialState === 'function' ? partialState(state) : partialState;

    state = {
      ...state,
      ...newValue,
    };

    notifyListeners();
  }

  function getState() {
    return state;
  }

  function useStore<TValue>(selector: (currentState: T) => TValue): TValue {
    const [value, setValue] = useState(() => selector(state));

    useEffect(() => {
      const unsubscribe = subscribe(() => {
        const newValue = selector(state);

        if (value !== newValue) {
          setValue(newValue);
        }
      });

      return () => {
        unsubscribe();
      };
    }, [selector, value]);

    return value;
  }

  state = createState(setState);

  return {
    setState,
    getState,
    subscribe,
    useStore,
  };
}
