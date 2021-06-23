import produce from 'immer';

import { IWorkoutState, EWorkoutType, TWorkoutAction } from './workoutTypes';

export const initialWorkoutState: IWorkoutState = {
  workoutDatas: [],
  message: null,
  error: null,
};

const workoutReducer = (state = initialWorkoutState, action: TWorkoutAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case EWorkoutType.WORKOUT_LOAD_REQUEST:
      case EWorkoutType.WORKOUT_REGISTER_REQUEST:
      case EWorkoutType.WORKOUT_EDIT_REQUEST:
      case EWorkoutType.WORKOUT_ACHIEVE_REQUEST: {
        break;
      }

      case EWorkoutType.WORKOUT_LOAD_SUCCESS: {
        draft.workoutDatas = action.payload.workoutDatas;
        break;
      }

      case EWorkoutType.WORKOUT_REGISTER_SUCCESS: {
        draft.workoutDatas.unshift(action.payload.workoutDatas);
        break;
      }

      case EWorkoutType.WORKOUT_EDIT_SUCCESS: {
        const index = draft.workoutDatas.findIndex(workoutData => workoutData.id === action.payload.workoutDatas.id);
        draft.workoutDatas[index] = action.payload.workoutDatas;
        break;
      }

      case EWorkoutType.WORKOUT_ACHIEVE_SUCCESS: {
        const index = draft.workoutDatas.findIndex(workoutData => workoutData.id === action.payload.id);
        draft.workoutDatas.splice(index, 1);
        break;
      }

      case EWorkoutType.WORKOUT_LOAD_FAILURE:
      case EWorkoutType.WORKOUT_REGISTER_FAILURE:
      case EWorkoutType.WORKOUT_EDIT_FAILURE:
      case EWorkoutType.WORKOUT_ACHIEVE_FAILURE: {
        draft.message = action.message;
        break;
      }

      case EWorkoutType.WORKOUT_LOAD_ERROR:
      case EWorkoutType.WORKOUT_REGISTER_ERROR:
      case EWorkoutType.WORKOUT_EDIT_ERROR:
      case EWorkoutType.WORKOUT_ACHIEVE_ERROR: {
        draft.error = action.error;
        break;
      }

      default:
        break;
    }
  });
};

export default workoutReducer;
