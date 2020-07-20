import React from 'react';
import {Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import ImageIcon from '@material-ui/icons/Image';
import SettingsIcon from '@material-ui/icons/Settings';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AssignmentIcon from '@material-ui/icons/Assignment';
export const mainListItems = (
  <div>
    <ListItem button component = {Link} to ="/home">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component = {Link} to ="/sideproject">
      <ListItemIcon>
        <AppsIcon />
      </ListItemIcon>
      <ListItemText primary="Side Project" />
    </ListItem>
    <ListItem button component = {Link} to ="/freeimage">
      <ListItemIcon>
        <ImageIcon />
      </ListItemIcon>
      <ListItemText primary="Free Image" />
    </ListItem>
    <ListItem button component = {Link} to ="/openapidoc">
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="API Doc" />
    </ListItem>
    <ListItem button component = {Link} to ="/openapikey">
      <ListItemIcon>
        <VpnKeyIcon />
      </ListItemIcon>
      <ListItemText primary="API Key" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Other Page</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Page 1" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Page 2" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Page 3" />
    </ListItem>
  </div>
);