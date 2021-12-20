let nextTd = 0;

const portfolioReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_PORTFOLIO":
      return [
        ...state,
        {
          id: nextTd++,
          portfolios: action.data.portfolio,
          portfolio: action.data.base64,
        },
      ];
    case "TGGLE_TODO":
      return state.map((todo) =>
        todo.id == action.id ? { ...todo, completed: !todo.complete } : todo
      );
    case "TOGGLE_PORTFOLIO":
      return state.filter((todo) => todo.id != action.id);
    case "API_PORTFOLIO_DATA":
      return action.data;
    default:
      return state;
  }
};

export default portfolioReducer;
