let nextTd = 0;

const expertReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_SKILL":
      return [
        ...state,
        {
          _id: nextTd++,
          id: action.data.value,
          name: action.data.label,
        },
      ];
    case "TGGLE_TODO":
      return state.map((todo) =>
        todo.id == action.id ? { ...todo, completed: !todo.complete } : todo
      );
    case "TOGGLE_SKILL":
      return state.filter((todo) => todo.id != action.id);
    case "SAVE_SKILL":
      return action.data;
    default:
      return state;
  }
};

export default expertReducer;
