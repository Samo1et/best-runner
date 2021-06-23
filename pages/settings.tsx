import React from 'react';

import { Typography } from '@material-ui/core';
import Layout from '@components/Layout';

const Settings = ({pathname}) => {
  return (
      <Layout pathname={pathname}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        
      </Layout>
  );
};


export default Settings;
