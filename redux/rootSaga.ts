import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import workoutSaga from './workout/workoutSaga'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/api';

export default function* rootSaga() {
  yield all([fork(workoutSaga)]);
}
