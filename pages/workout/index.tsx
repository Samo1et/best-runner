import React from 'react';
import { NextJSContext } from 'next-redux-wrapper';
import { useRouter } from 'next/router';

import WorkoutListContainer from '@containers/workoutListContainer';

import { EWorkoutType } from '@redux/workout/workoutTypes';
import { Divider, Grid, Typography } from '@material-ui/core';
import Layout from '@components/Layout';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';

const WorkoutPage = ({ pathname }) => {
  const router = useRouter();

  const handleClickAddWorkout = () => {
    router.push(`/workout/create`);
  };

  return (
    <Layout pathname={pathname}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Workout List
        </Typography>
        <Button
          onClick={handleClickAddWorkout}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
        >
          Add workout
        </Button>
      </Grid>
      <Divider />
      <WorkoutListContainer />
    </Layout>
  );
};

WorkoutPage.getInitialProps = async ({ store }: NextJSContext) => {
  store.dispatch({
    type: EWorkoutType.WORKOUT_LOAD_REQUEST,
  });

  return {};
};

export default WorkoutPage;
