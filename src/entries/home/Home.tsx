import React, { FC, useEffect } from 'react';
import {Outlet, Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import InventoryIcon from '@mui/icons-material/Inventory';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

interface HomeProps {
    //
}

const Home: FC<HomeProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/about');
        }
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid item xs={3}>
                    <List
                        subheader={
                            <ListSubheader component="div">菜单</ListSubheader>
                        }
                    >
                        <ListItem button component={RouterLink} to="/config">
                            <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>设置</ListItemText>
                        </ListItem>
                        <ListItem button component={RouterLink} to="/install">
                            <ListItemIcon>
                                <InstallDesktopIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>安装</ListItemText>
                        </ListItem>
                        <ListItem button component={RouterLink} to="/bundle">
                            <ListItemIcon>
                                <InventoryIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>打包</ListItemText>
                        </ListItem>
                        <ListItem button component={RouterLink} to="/about">
                            <ListItemIcon>
                                <InfoIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>关于</ListItemText>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9} style={{
                    overflow: 'auto'
                }}>
                    <Outlet />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
