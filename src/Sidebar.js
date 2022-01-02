import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HotelIcon from '@mui/icons-material/Hotel';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Link } from 'react-router-dom';
const drawerWidth = 250;

export default function Sidebar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
            <ListItem
              button
              key={'logo'}
              style={{ fontSize: '24px', fontWeight: '700' }}
            >
              <ListItemIcon style={{ color: 'black' }}>
                <LocalHospitalIcon />
              </ListItemIcon>
              <p>FITNESS TRACKER</p>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
            <ListItem button key={'pulse-rate'}>
              <ListItemIcon style={{ color: 'red' }}>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={'Pulse Rate'} />
            </ListItem>
          </Link>
          <Link
            to="/pulsereport"
            style={{ color: 'black', textDecoration: 'none' }}
          >
            <ListItem button key={'pulse-report'}>
              <ListItemIcon style={{ color: 'black' }}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary={'Pulse Report'} />
            </ListItem>
          </Link>
          <Link to="/walk" style={{ color: 'black', textDecoration: 'none' }}>
            <ListItem button key={'distance-covered'}>
              <ListItemIcon style={{ color: 'black' }}>
                <DirectionsRunIcon />
              </ListItemIcon>
              <ListItemText primary={'Distance Covered'} />
            </ListItem>
          </Link>
          <Link to="/weight" style={{ color: 'black', textDecoration: 'none' }}>
            <ListItem button key={'weight-report'}>
              <ListItemIcon style={{ color: 'black' }}>
                <FitnessCenterIcon />
              </ListItemIcon>
              <ListItemText primary={'Weight Report'} />
            </ListItem>
          </Link>
          <Link to="/sleep" style={{ color: 'black', textDecoration: 'none' }}>
            <ListItem button key={'sleep-time'}>
              <ListItemIcon style={{ color: 'black' }}>
                <HotelIcon />
              </ListItemIcon>
              <ListItemText primary={'Sleep Time'} />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
