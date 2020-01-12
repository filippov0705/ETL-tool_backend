export const GET_USER_DATA = "GET_USER_DATA";
export const NEW_PROCEDURE_NAME = "NEW_PROCEDURE_NAME";
export const EDIT_DATE = "EDIT_DATE";
export const EDIT_TIME = "EDIT_TIME";
export const EDIT_LIST = "EDIT_LIST";
export const SET_PERIODICITY = "SET_PERIODICITY";
export const SET_CHOSEN_TASKS = "SET_CHOSEN_TASKS";
export const NEW_PROCEDURE_CREATE = "NEW_PROCEDURE_CREATE";
export const SET_TARGET_PROCEDURE = "SET_TARGET_PROCEDURE";
export const CHANGE_TASK_LIST = "CHANGE_TASK_LIST";
export const ADD_NEW_SCHEDULE = "ADD_NEW_SCHEDULE";
export const REMOVE_SCHEDULE = "REMOVE_SCHEDULE";
export const EDIT_SCHEDULE = "EDIT_SCHEDULE";
export const GET_PROCEDURES_HEADS = "GET_USER_PROCEDURES_HEADS";
export const GET_PROCEDURE_SCHEDULES = "GET_PROCEDURE_SCHEDULES";

export function getUserData() {
  return {
    type: GET_USER_DATA,
    payload: ""
  };
}

export function setTargetProcedure(id) {
  return {
    type: SET_TARGET_PROCEDURE,
    payload: id
  };
}

export function newProcedureName(name) {
  return {
    type: NEW_PROCEDURE_NAME,
    payload: name
  };
}

export function editList(list) {
  return {
    type: EDIT_LIST,
    payload: list
  };
}

export function setChosenTasks(id) {
  return {
    type: SET_CHOSEN_TASKS,
    payload: id
  };
}

export function changeTaskList(taskList) {
  return {
    type: CHANGE_TASK_LIST,
    payload: taskList
  };
}

export function getProceduresHeads(userId) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/main/${userId}`)
      .then(result => result.json())
      .then(content => {
        dispatch({
          type: GET_PROCEDURES_HEADS,
          payload: content
        });
      });
  };
}

export function newProcedureCreate(userID, newProcedure) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/new/${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(newProcedure)
    }).then(() =>
      dispatch({
        type: NEW_PROCEDURE_CREATE,
        payload: newProcedure
      })
    );
  };
}

export function getProcedureSchedules(userId, procedureId) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/schedules/${userId}/${procedureId}`)
    .then(result => result.json())
    .then(content => dispatch({
      type: GET_PROCEDURE_SCHEDULES,
      payload: content
    }))
  }
}


export function removeSchedule(userId, procedureId, scheduleId) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/schedules/${userId}/${procedureId}`, {
      method: "DELETE",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({id: scheduleId})
    }).then(result => result.json())
    .then(content => dispatch({
      type: REMOVE_SCHEDULE,
      payload: content
    }))
  }
}

export function addNewSchedule(userId, procedureId, newSchedule) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/schedules/${userId}/${procedureId}`, {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newSchedule)
    }).then(response => response.json())
    .then(content => dispatch({
      type: ADD_NEW_SCHEDULE,
      payload: content
    }))
  }
}

export function editSchedule(userId, procedureId, editableSchedule) {
  return dispatch => {
    fetch(`http://localhost:3001/api/procedures/schedules/${userId}/${procedureId}`, {
      method: "PUT",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(editableSchedule)
    }).then(response => response.json())
    .then(content => dispatch({
      type: EDIT_SCHEDULE,
      payload: content
    }))
  }
}