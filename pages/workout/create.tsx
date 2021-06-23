import React from 'react';
import { Typography } from '@material-ui/core';
import Layout from '@components/Layout';
import AddWorkoutContainer from '@containers/addWorkoutContainer';

const Create = ({ pathname }) => {
  return (
    <Layout pathname={pathname} backButton>
      <Typography variant="h4" component="h1" gutterBottom>
        Create workout
      </Typography>
      <AddWorkoutContainer />
    </Layout>
  );
};

export default Create;
