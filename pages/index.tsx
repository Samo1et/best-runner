import React from 'react';
import { NextJSContext } from 'next-redux-wrapper';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Typography, Container, makeStyles } from '@material-ui/core';
import Layout from '@components/Layout';
import { useSelector } from 'react-redux';
import { TRootState } from '@redux/rootReducer';
import { EWorkoutType } from '@redux/workout/workoutTypes';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: 300,
  },
}));

const Index = ({ pathname }) => {
  const theme = useTheme();
  const styles = useStyles();
  const { workoutDatas } = useSelector((state: TRootState) => state.workout);
  const sortedWorkout = workoutDatas
    .filter(workout => (workout.date > (new Date().getTime() - 7 * 24 * 60 * 60 * 1000)))
    .sort((a, b) => a.date - b.date)
    .map(workout => ({...workout, date: new Date(workout.date).getDate()}));
  
  return (
    <Layout pathname={pathname}>
      <Typography variant="h4" component="h1" gutterBottom>
        This week
      </Typography>
      <Container className={styles.wrapper}>
        <ResponsiveContainer>
          <LineChart
            data={sortedWorkout}
            width={500}
            height={300}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
              >
                Distance
              </Label>
            </YAxis>
            <Line type="monotone" dataKey="distance" stroke={theme.palette.primary.main} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </Container>
    </Layout>
  );
};

Index.getInitialProps = async ({ store }: NextJSContext) => {
  store.dispatch({
    type: EWorkoutType.WORKOUT_LOAD_REQUEST,
  });

  return {};
};

export default Index;