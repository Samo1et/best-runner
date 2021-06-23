import { workoutType } from 'types';
import { EWorkoutType } from './workoutTypes';

export const workoutRegisterAction = (date: number, type: workoutType, distance: number, comment: string) => ({
  type: EWorkoutType.WORKOUT_REGISTER_REQUEST,
  payload: { date, type, distance, comment },
});

export const workoutAchieveAction = () => ({ type: EWorkoutType.WORKOUT_ACHIEVE_REQUEST });
