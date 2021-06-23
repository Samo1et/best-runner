import React from 'react';
import { useDispatch } from 'react-redux';
import WorkoutForm from '@components/WorkoutForm';
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { TRootState } from '@redux/rootReducer';
import { EWorkoutType } from '@redux/workout/workoutTypes';

interface IProps{
    id: number
}

const WorkoutDetailsContainer: React.FC<IProps> = ({id})=> {
  const dispatch = useDispatch();
  const { workoutDatas } = useSelector((state: TRootState) => state.workout);

  const workoutData = workoutDatas.find(workout => workout.id === parseInt(id.toString(), 10));

  const onSubmitForm = ({comment = '', date, distance, type}) => {
    const formatDate = new Date(date).getTime();
    dispatch({
      type: EWorkoutType.WORKOUT_EDIT_REQUEST,
      payload: {id, date: formatDate, comment,distance, type }
    })
    
  };

  return <WorkoutForm {...workoutData} submitButtonName="Update" onSubmitForm={onSubmitForm} />
};

export default WorkoutDetailsContainer;