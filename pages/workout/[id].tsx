import React from 'react';
import { NextJSContext } from 'next-redux-wrapper';
import WorkoutDetailsContainer from '@containers/workoutDetailsContainer'
import { EWorkoutType } from '@redux/workout/workoutTypes';
import Layout from '@components/Layout';

const Detail = ({ id, pathname }) => {
  return (
    <Layout backButton pathname={pathname}>
      <WorkoutDetailsContainer id={id} />
    </Layout>
  );
};

Detail.getInitialProps = ({ store, query }: NextJSContext) => {
  store.dispatch({
    type: EWorkoutType.WORKOUT_LOAD_REQUEST,
  });

  return { id: query.id };
};

export default Detail;