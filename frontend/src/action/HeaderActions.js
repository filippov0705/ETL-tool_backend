export const MENU_SATE_CHANGE = "MENU_SATE_CHANGE";
export const REDIRECT_FROM_PAGE = "REDIRECT_FROM_PAGE";

export function menuStateChange(state) {
  return {
    type: MENU_SATE_CHANGE,
    payload: state
  };
}
