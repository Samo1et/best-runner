import { all, takeLatest, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { EWorkoutType } from './workoutTypes';

const workoutRegisterRequest = async data => await axios.post('/workout/', data);

function* workoutRegister(action) {
  try {
    const result = yield call(workoutRegisterRequest, action.payload);
    if (result.status === 200) {
      yield put({
        type: EWorkoutType.WORKOUT_REGISTER_SUCCESS,
        payload: { workoutDatas: result.data.workoutDatas },
      });
    } else {
      yield put({
        type: EWorkoutType.WORKOUT_REGISTER_FAILURE,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: EWorkoutType.WORKOUT_REGISTER_ERROR,
      error: e,
    });
  }
}

function* watchWorkoutRegister() {
  yield takeLatest(EWorkoutType.WORKOUT_REGISTER_REQUEST, workoutRegister);
}

const workoutEditRequest = async data => await axios.post(`/workout/${data.id}`, data);

function* workoutEdit(action) {
  try {
    const result = yield call(workoutEditRequest, action.payload);
    if (result.status === 200) {
      yield put({
        type: EWorkoutType.WORKOUT_EDIT_SUCCESS,
        payload: { workoutDatas: result.data.workoutDatas },
      });
    } else {
      yield put({
        type: EWorkoutType.WORKOUT_EDIT_FAILURE,
        message: result.data.message,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: EWorkoutType.WORKOUT_EDIT_ERROR,
      error: e,
    });
  }
}

function* watchWorkoutEdit() {
  yield takeLatest(EWorkoutType.WORKOUT_EDIT_REQUEST, workoutEdit);
}

const workoutLoadRequest = async () => await axios.get('/workout/');

function* workoutLoad() {
  try {
    const result = yield call(workoutLoadRequest);
    if (result.status === 200) {
      yield put({
        type: EWorkoutType.WORKOUT_LOAD_SUCCESS,
        payload: result.data,
      });
    } else {
      yield put({
        type: EWorkoutType.WORKOUT_LOAD_FAILURE,
        message: result.data.message,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: EWorkoutType.WORKOUT_LOAD_ERROR,
      error: e,
    });
  }
}

function* watchWorkoutLoad() {
  yield takeLatest(EWorkoutType.WORKOUT_LOAD_REQUEST, workoutLoad);
}

const workoutAchieveRequest = async data => await axios.delete(`/workout/${data}`);

function* workoutAchieve(action) {
  try {
    const result = yield call(workoutAchieveRequest, action.payload.id);
    if (result.status === 200) {
      yield put({
        type: EWorkoutType.WORKOUT_ACHIEVE_SUCCESS,
        payload: { id: result.data.id },
      });
    } else {
      yield put({
        type: EWorkoutType.WORKOUT_ACHIEVE_FAILURE,
        message: result.data.message,
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: EWorkoutType.WORKOUT_ACHIEVE_ERROR,
      error: e,
    });
  }
}

function* watchWorkoutAchieve() {
  yield takeLatest(EWorkoutType.WORKOUT_ACHIEVE_REQUEST, workoutAchieve);
}

export default function* workoutSaga() {
  yield all([fork(watchWorkoutRegister), fork(watchWorkoutLoad), fork(watchWorkoutEdit), fork(watchWorkoutAchieve)]);
}
