let nextTd = 0;

const employmentReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_COMPANY":
      return [
        ...state,
        {
          _id: nextTd++,
          //text: action.data.text,
          id: action.data.id,
          name: action.data.name,
          role: action.data.role,
          responsibilities: action.data.responsibilities,
          stop_date: action.data.stopDate,
          start_date: action.data.startDate,
          completed: false,
        },
      ];
    case "TGGLE_TODO":
      return state.map((todo) =>
        todo.id == action.id ? { ...todo, completed: !todo.complete } : todo
      );
    case "TOGGLE_COMPANY":
      return state.filter((todo) => todo.id != action.id);

    // case "API_WORK_DATA":
    //   return action.data;
    default:
      return state;
  }
};

export default employmentReducer;
