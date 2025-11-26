export const initialStore = () => {
  return {
    message: null,

    // Estado de autenticación
    auth: {
      token: sessionStorage.getItem("token") || null,
      user: null
    },

    // Datos de ejemplo
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "LOGIN":
      return {
        ...store,
        auth: {
          token: action.payload.token,
          user: action.payload.user
        }
      };

    case "LOGOUT":
      return {
        ...store,
        auth: {
          token: null,
          user: null
        }
      };

    case "set_hello":
      return {
        ...store,
        message: action.payload
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        )
      };

    default:
      throw Error("Unknown action.");
  }
}
