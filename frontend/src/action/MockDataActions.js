export const SET_TARGET_PROCEDURE = "SET_TARGET_PROCEDURE";

export function setTargetProcedure(id) {
  return {
    type: SET_TARGET_PROCEDURE,
    payload: id
  };
}
