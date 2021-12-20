let nextTd = 0;

const milestoneReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_MILESTONE":
      return [
        ...state,
        {
          id: nextTd++,
          //text: action.data.text,
          title: action.data.title,
          date: action.data.date,
          amount: action.data.amount,
        },
      ];
    case "ADD_AMOUNT":
      return [...state, Number(action.data.amount)];
    case "TGGLE_TODO":
      return state.map((todo) =>
        todo.id == action.id ? { ...todo, completed: !todo.complete } : todo
      );
    case "TOGGLE_MILESTONE":
      return state.filter((todo) => todo.id != action.id);
    default:
      return state;
  }
};

export default milestoneReducer;
