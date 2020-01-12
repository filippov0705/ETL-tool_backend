import { MENU_SATE_CHANGE } from "../action/HeaderActions";

const initialState = () => {
  return {
    isUserMenuActive: false
  };
};

export function headerReducer(state = initialState(), action) {
  switch (action.type) {
    case MENU_SATE_CHANGE:
      return { ...state, isUserMenuActive: action.payload };

    default:
      return state;
  }
}
