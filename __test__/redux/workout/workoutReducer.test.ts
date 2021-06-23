import workoutReducer, { initialWorkoutState } from '@redux/workout/workoutReducer';
import { EWorkoutType } from '@redux/workout/workoutTypes';
import { workoutType } from '../../../types';

describe('workoutReducer', () => {
  const mockWorkoutDatas = [
    {
      id: 0,
      date: 1624345415241,
      type: workoutType.RUN,
      distance: 50,
      comment: 'Good weather'
    },
    {
      id: 1,
      date: 1624345415246,
      type: workoutType.WALK,
      distance: 99,
      comment: 'I like sport'
    }
  ];

  it('should return the initial state when init reducer', () => {
    expect(workoutReducer(initialWorkoutState, {} as any)).toEqual(initialWorkoutState);
  });

  it('should loads workoutDatas when the load request success', () => {
    expect(
      workoutReducer(initialWorkoutState, {
        type: EWorkoutType.WORKOUT_LOAD_SUCCESS,
        payload: { workoutDatas: mockWorkoutDatas },
      }),
    ).toEqual({ workoutDatas: mockWorkoutDatas, message: null, error: null });
  });

  it('should inserts the workoutData when the insert request success', () => {
    expect(
      workoutReducer(initialWorkoutState, {
        type: EWorkoutType.WORKOUT_REGISTER_SUCCESS,
        payload: {
          workoutDatas: {
            id: 0, date: 1624345415241,
            type: workoutType.RUN,
            distance: 99,
            comment: 'Good weather'
          }
        },
      }),
    ).toEqual({ workoutDatas: [{
      id: 0, date: 1624345415241,
      type: workoutType.RUN,
      distance: 99,
      comment: 'Good weather'
    }], message: null, error: null });
  });

  it('should update the workoutData when the edit request success', () => {
    expect(
      workoutReducer({ workoutDatas: mockWorkoutDatas, message: null, error: null }, {
        type: EWorkoutType.WORKOUT_EDIT_SUCCESS,
        payload: { workoutDatas: { 
          id: 0, 
          date: 1624345415241,
          type: workoutType.RUN,
          distance: 999,
          comment: 'Cold weather '
        } },
      }),
    ).toEqual({ workoutDatas: [
      {
        id: 0, 
        date: 1624345415241,
        type: workoutType.RUN,
        distance: 999,
        comment: 'Cold weather '
      },
      {
        id: 1,
        date: 1624345415246,
        type: workoutType.WALK,
        distance: 99,
        comment: 'I like sport'
      }
    ], message: null, error: null });
  });

  it('should removes the workoutData when the achieve request success', () => {
    expect(
      workoutReducer(
        { workoutDatas: mockWorkoutDatas, message: null, error: null },
        {
          type: EWorkoutType.WORKOUT_ACHIEVE_SUCCESS,
          payload: { id: 0 },
        },
      ),
    ).toEqual({
      workoutDatas: [{
        id: 1,
        date: 1624345415246,
        type: 'walk',
        distance: 99,
        comment: 'I like sport'
      }], message: null, error: null
    });
  });
});
