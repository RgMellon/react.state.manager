# Entendimento do createStore

## Observação sobre os listeners

Os listeners ficam ouvindo o observable e assim que houver uma mudança, eles são disparados.

---

## Importação do `globalStore`

Quando o `globalStore` é importado, o `createStore` é executado.

---

## O que acontece quando a função `createStore` é chamada?

- `createState` é armazenada na memória.
- Variáveis `state` e `listeners` são criadas.
- Funções `subscribe`, `notify`, `setState` e `getState` são criadas na memória.
- Por fim, `state = createState(setState)`, ou seja, a função `createState` é executada, adicionando valor no `state`.

---

## Fluxo do `createStore`

1. `fn createStore`
2. `fn (setState) => T`
3. `fn setState: SetStateFn<T>`

---

## O que ocorre no `createState`

Quando chamamos:

```typescript
(createState) => ({
  todos: [],
  user: null,
  login: () => {
    setState({
      user: {
        email: 'rgmelo',
        name: 'Renan',
      },
    });
  },
  logout: () => {
    setState({
      user: null,
    });
  },
});
```

Ao fazer isso, passamos a função setState criada e já em memória como parâmetro da função createState.

A função createState retorna um objeto, e este objeto se torna o valor inicial do state.

### Observação final

Aqui, o setState foi passado por parâmetro, o mesmo setState definido no createStore, e ele vai ser executado apenas quando o login ou logout forem chamados.
