import { workoutType } from 'types';

export interface IWorkoutState {
  workoutDatas: IWorkout[];
  message: string;
  error: Error;
}

export interface IWorkout {
  id: number;
  date: number;
  type: workoutType;
  distance: number;
  comment: string;
}

export enum EWorkoutType {
  WORKOUT_LOAD_REQUEST = 'WORKOUT_LOAD_REQUEST',
  WORKOUT_LOAD_SUCCESS = 'WORKOUT_LOAD_SUCCESS',
  WORKOUT_LOAD_FAILURE = 'WORKOUT_LOAD_FAILURE',
  WORKOUT_LOAD_ERROR = 'WORKOUT_LOAD_ERROR',

  WORKOUT_REGISTER_REQUEST = 'WORKOUT_REGISTER_REQUEST',
  WORKOUT_REGISTER_SUCCESS = 'WORKOUT_REGISTER_SUCCESS',
  WORKOUT_REGISTER_FAILURE = 'WORKOUT_REGISTER_FAILURE',
  WORKOUT_REGISTER_ERROR = 'WORKOUT_REGISTER_ERROR',

  WORKOUT_EDIT_REQUEST = 'WORKOUT_EDIT_REQUEST',
  WORKOUT_EDIT_SUCCESS = 'WORKOUT_EDIT_SUCCESS',
  WORKOUT_EDIT_FAILURE = 'WORKOUT_EDIT_FAILURE',
  WORKOUT_EDIT_ERROR = 'WORKOUT_EDIT_ERROR',

  WORKOUT_ACHIEVE_REQUEST = 'WORKOUT_ACHIEVE_REQUEST',
  WORKOUT_ACHIEVE_SUCCESS = 'WORKOUT_ACHIEVE_SUCCESS',
  WORKOUT_ACHIEVE_FAILURE = 'WORKOUT_ACHIEVE_FAILURE',
  WORKOUT_ACHIEVE_ERROR = 'WORKOUT_ACHIEVE_ERROR',
}

export type TWorkoutAction =
  | IWorkoutLoadRequest
  | IWorkoutLoadSuccess
  | IWorkoutLoadFailure
  | IWorkoutLoadError
  | IWorkoutRegisterRequest
  | IWorkoutRegisterSuccess
  | IWorkoutRegisterFailure
  | IWorkoutRegisterError
  | IWorkoutEditRequest
  | IWorkoutEditSuccess
  | IWorkoutEditFailure
  | IWorkoutEditError
  | IWorkoutAchieveRequest
  | IWorkoutAchieveSuccess
  | IWorkoutAchieveFailure
  | IWorkoutAchieveError;

interface IWorkoutLoadRequest {
  type: EWorkoutType.WORKOUT_LOAD_REQUEST;
}

interface IWorkoutLoadSuccess {
  type: EWorkoutType.WORKOUT_LOAD_SUCCESS;
  payload: { workoutDatas: IWorkout[] };
}

interface IWorkoutLoadFailure {
  type: EWorkoutType.WORKOUT_LOAD_FAILURE;
  message: string;
}

interface IWorkoutLoadError {
  type: EWorkoutType.WORKOUT_LOAD_ERROR;
  error: Error;
}

interface IWorkoutRegisterRequest {
  type: EWorkoutType.WORKOUT_REGISTER_REQUEST;
  payload: { content: string };
}

interface IWorkoutRegisterSuccess {
  type: EWorkoutType.WORKOUT_REGISTER_SUCCESS;
  payload: { workoutDatas: IWorkout };
}

interface IWorkoutRegisterFailure {
  type: EWorkoutType.WORKOUT_REGISTER_FAILURE;
  message: string;
}

interface IWorkoutRegisterError {
  type: EWorkoutType.WORKOUT_REGISTER_ERROR;
  error: Error;
}

interface IWorkoutEditRequest {
  type: EWorkoutType.WORKOUT_EDIT_REQUEST;
  payload: { id: number; type: string; date: number; distance: number; comment: string };
}

interface IWorkoutEditSuccess {
  type: EWorkoutType.WORKOUT_EDIT_SUCCESS;
  payload: { workoutDatas: IWorkout };
}

interface IWorkoutEditFailure {
  type: EWorkoutType.WORKOUT_EDIT_FAILURE;
  message: string;
}

interface IWorkoutEditError {
  type: EWorkoutType.WORKOUT_EDIT_ERROR;
  error: Error;
}

interface IWorkoutAchieveRequest {
  type: EWorkoutType.WORKOUT_ACHIEVE_REQUEST;
  payload: { id: number };
}

interface IWorkoutAchieveSuccess {
  type: EWorkoutType.WORKOUT_ACHIEVE_SUCCESS;
  payload: { id: number };
}

interface IWorkoutAchieveFailure {
  type: EWorkoutType.WORKOUT_ACHIEVE_FAILURE;
  message: string;
}

interface IWorkoutAchieveError {
  type: EWorkoutType.WORKOUT_ACHIEVE_ERROR;
  error: Error;
}
