let nextTd = 0;

const linkReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_LINK":
      return [
        ...state,
        {
          id: nextTd++,
          link: action.data.link,
        },
      ];
    case "TGGLE_TODO":
      return state.map((todo) =>
        todo.id == action.id ? { ...todo, completed: !todo.complete } : todo
      );
    case "TOGGLE_LINK":
      return state.filter((todo) => todo.id != action.id);
    default:
      return state;
  }
};

export default linkReducer;
