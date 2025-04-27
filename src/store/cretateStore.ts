type SetterState<T> = (state: T) => Partial<T>;

export function createStore<T>(initialState: T) {
  let state = initialState;
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

  function setState(partialState: Partial<T> | SetterState<T>) {
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

  return {
    setState,
    getState,
    subscribe,
  };
}
