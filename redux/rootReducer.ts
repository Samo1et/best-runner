import { combineReducers } from 'redux';

import workoutReducer from './workout/workoutReducer'

const rootReducer = combineReducers({
  workout: workoutReducer
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
