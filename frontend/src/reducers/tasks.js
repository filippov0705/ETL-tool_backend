import { GET_POSSIBLE_TASKS } from "../action/TasksAction";

const initialState = () => {
  return {
    possible: []
  };
};

export function tasksReducer(state = initialState(), action) {
  switch (action.type) {
    case GET_POSSIBLE_TASKS:
      return { possible: action.payload };

    default:
      return state;
  }
}
