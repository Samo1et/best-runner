import React from 'react';
import { useRouter } from 'next/router';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SettingsIcon from '@material-ui/icons/Settings';
import Home from '@material-ui/icons/Home';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

const listLinks = [
  { url: '/', name: 'Home', icon: <Home /> },
  { url: '/workout', name: 'Workouts', icon: <DirectionsRunIcon /> },
  { url: '/settings', name: 'Settings', icon: <SettingsIcon /> },
];

const LinkItem = ({ url, name, icon, router }) => (
  <ListItem key={url} button onClick={() => router.push(url)}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={name} />
  </ListItem>
);

export const MainListItems = () => {
  const router = useRouter();
  return (
    <div>
      {listLinks.map(linkProps => (
        <LinkItem router={router} {...linkProps} />
      ))}
    </div>
  );
};
