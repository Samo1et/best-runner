import React from 'react';
import { useDispatch } from 'react-redux';

import { workoutRegisterAction } from '@redux/workout/workoutAction';
import WorkoutForm from '@components/WorkoutForm';


const AddWorkoutContainer: React.FC = () => {
  const dispatch = useDispatch();

  const onSubmitForm = ({comment = '', date, distance, type}) => {
    const formatDate = new Date(date).getTime();
    dispatch(workoutRegisterAction(formatDate, type, distance, comment));
  };

  return <WorkoutForm onSubmitForm={onSubmitForm} submitButtonName="Submit" />
};

export default AddWorkoutContainer;
