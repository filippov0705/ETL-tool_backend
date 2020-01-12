import {
  ADD_NEW_SCHEDULE,
  CHANGE_TASK_LIST,
  EDIT_DATE,
  EDIT_LIST,
  EDIT_TIME,
  EDIT_SCHEDULE,
  GET_USER_DATA,
  GET_PROCEDURES_HEADS,
  REMOVE_SCHEDULE,
  SET_PERIODICITY,
  SET_CHOSEN_TASKS,
  SET_TARGET_PROCEDURE,
  NEW_PROCEDURE_CREATE,
  NEW_PROCEDURE_NAME,
  GET_PROCEDURE_SCHEDULES
} from "../action/ProceduresActions";
import { mockData } from "./mockData";

const initialState = () => {
  return {
    userId: mockData.user_id,
    list: [],
    targetProcedure: null
  };
};

export function proceduresReducer(state = initialState(), action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        heads: mockData.allProceduresHeads,
        list: mockData.allProcedures
      };

    case NEW_PROCEDURE_CREATE:
      return {
        ...state,
        list: [...state.list, action.payload]
      };

    case SET_TARGET_PROCEDURE:
      return {
        ...state,
        targetProcedure: state.proceduresList.filter(
          item => item.id === action.payload
        )
      };

    case NEW_PROCEDURE_NAME:
      return { ...state, newProcedureName: action.payload };

    case EDIT_DATE:
      return { ...state, procedureNewDate: action.payload };

    case EDIT_TIME:
      return { ...state, procedureNewTime: action.payload };

    case EDIT_LIST:
      return {
        ...state,
        list: action.payload,
        prcedureNewDate: []
      };

    case SET_PERIODICITY:
      return { ...state, periodicity: action.payload };

    case SET_CHOSEN_TASKS:
      return {
        ...state,
        targetProcedure: state.proceduresList,
        chosenTasks: state.proceduresList.find(
          item => item.id === action.payload
        ).tasks
      };

    case CHANGE_TASK_LIST:
      return {
        ...state,
        chosenTasks: action.payload
      };

    case ADD_NEW_SCHEDULE:
      return { ...state, targetProcedure: action.payload};

    case REMOVE_SCHEDULE:
      return { ...state, targetProcedure: action.payload};

    case EDIT_SCHEDULE:
      return { ...state, targetProcedure: action.payload}

    case GET_PROCEDURES_HEADS: {
      return { ...state, list: action.payload };
    }

    case GET_PROCEDURE_SCHEDULES: {
      return { ...state, targetProcedure: action.payload };
    }

    default:
      return state;
  }
}
