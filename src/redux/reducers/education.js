let nextTd = 0;

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_SCHOOL":
      return [
        ...state,
        {
          _id: nextTd++,
          name: action.data.name,
          course: action.data.course,
          degree: action.data.degree,
          stop_date: action.data.stopDate,
          start_date: action.data.startDate,
          completed: false,
        },
      ];
    case "TGGLE_TODO":
      return state.map((todo) =>
        todo.id == action.id ? { ...todo, completed: !todo.complete } : todo
      );
    case "DELETE_SCHOOL":
      return state.filter((todo) => todo.id != action.id);
    // case "API_SCHOOL_DATA":
    //   return action.data;
    default:
      return state;
  }
};

export default todosReducer;
