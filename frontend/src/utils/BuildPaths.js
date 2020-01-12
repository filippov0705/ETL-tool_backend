import { MAIN, PROCEDURES } from "../constants/urls";

export const mainPath = () => MAIN;
export const ProceduresPath = () => `${MAIN}${PROCEDURES}`;
export const newProcedurePath = () => `${MAIN}${PROCEDURES}new`;
export const editProcedurePath = () => `${MAIN}${PROCEDURES}:id/edit`;
export const procedureInfoPath = id => `${MAIN}${PROCEDURES}:id/more`;
export const procedureSchedulePath = id => `${MAIN}${PROCEDURES}:id/schedule`;

export const editProcedureUrl = id => `${MAIN}${PROCEDURES}${id}/edit`;
export const procedureInfoUrl = id => `${MAIN}${PROCEDURES}${id}/more`;
export const procedureScheduleUrl = id => `${MAIN}${PROCEDURES}${id}/schedule`;
