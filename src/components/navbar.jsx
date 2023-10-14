import * as React from 'react';



import { useState } from 'react';
import { Snackbar, Alert, Badge, MenuItem, Menu, Avatar, Typography, IconButton, Toolbar, Box, AppBar, Tooltip } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';

import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import IosShareIcon from '@mui/icons-material/IosShare';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

import { switchMode, logout } from '../store/counterSlice';


import SettingsIcon from '@mui/icons-material/Settings';
import Logo from '../asset/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import TranslateIcon from '@mui/icons-material/Translate';
import * as XLSX from 'xlsx';






export default function PrimarySearchAppBar({ arhamic, setArhamic }) {


    const state = useSelector(state => state.counter)


    const handleExportToExcel = () => {

        const worksheet = XLSX.utils.json_to_sheet(state?.chat);

        // Customizing the column widths
        const columnWidths = [
            { wch: 20 }, // Text column
            { wch: 30 }, // Response column
            //   { wch: 15 }, // Time column
        ];
        worksheet['!cols'] = columnWidths;

        // Customizing the cell styling
        const headerStyle = { font: { bold: true } };
        const dataStyle = { font: { color: { rgb: 'FF0000' } } }; // Red font color

        // Map the chat data to exclude the _id field
        const chatData = state?.chat?.map(({ text, response, time, _id }) => ({ text, response, time }));

        XLSX.utils.sheet_add_json(worksheet, chatData, { skipHeader: true, origin: 'A2' });
        worksheet['A1'] = { t: 's', v: 'Text', s: headerStyle };
        worksheet['B1'] = { t: 's', v: 'Response', s: headerStyle };
        worksheet['C1'] = { t: 's', v: 'Time', s: headerStyle };

        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let row = range.s.r + 1; row <= range.e.r; row++) {
            worksheet[`A${row}`].s = dataStyle;
            worksheet[`B${row}`].s = dataStyle;
            worksheet[`C${row}`].s = dataStyle;
        }

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Chat Data');
        XLSX.writeFile(workbook, 'chat-data.xlsx');

        setShowAlert({ open: true, text: "Data exported successfully", severity: "success" });
    }








    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElSetting, setAnchorElSetting] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isSettingOpen = Boolean(anchorElSetting);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSettingMenuOpen = (event) => {
        setAnchorElSetting(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setAnchorElSetting(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
            sx={{ marginTop: "4rem" }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); dispatch(logout()); navigate("/openAi_chat/signin") }}>Log out</MenuItem>

        </Menu>
    );



    const renderSetting = (
        <Menu
            sx={{ marginTop: "4rem" }}
            anchorEl={anchorElSetting}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isSettingOpen}
            onClose={handleMenuClose}
        >

            <MenuItem onClick={() => { navigate("/openAi_chat/contactUs"); handleMenuClose() }}>Contact Us</MenuItem>

        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <Menu
            sx={{ marginTop: "3rem" }}
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => handleExportToExcel()}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge>
                        <IosShareIcon />
                    </Badge>
                </IconButton>
                <p>Export chat</p>
            </MenuItem>


            {/* <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={6} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem> */}

            <MenuItem onClick={() => setArhamic(!arhamic)}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >

                    {!arhamic ?

                        <PublicIcon />
                        :
                        <TranslateIcon />

                    }
                </IconButton>
                <p>{!arhamic ? "English" : "Arhamic"}</p>
            </MenuItem>

            <MenuItem onClick={handleSettingMenuOpen} >


                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >




                    <Badge>
                        <SettingsIcon />
                    </Badge>


                </IconButton>
                <p>Settings</p>

            </MenuItem>


            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>

            <MenuItem onClick={() => dispatch(switchMode())}>

                <IconButton

                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {
                        state?.darkMode ?
                            <LightModeOutlinedIcon />
                            :
                            <DarkModeOutlinedIcon />

                    }
                </IconButton>
                <p>{state?.darkMode ? "Light mode" : "Dark mode"}</p>

            </MenuItem>



        </Menu>
    );


    const [showalert, setShowAlert] = useState({ text: "", open: false, severity: "success" })


    return (

        <Box fullWidth sx={{ flexGrow: 1, width: "100%" }}>


            <Snackbar open={showalert.open} autoHideDuration={5000} onClose={() => setShowAlert(false)} >
                <Alert severity={showalert.severity} sx={{ width: '100%' }} onClose={() => setShowAlert(false)}>
                    {`${showalert.text}`}
                </Alert>
            </Snackbar>

            <AppBar color="secondary" sx={{ width: "100%" }} position="static">
                <Toolbar>

                    <img src={Logo} style={{ width: "5rem", height: "3rem", paddingRight: "1rem" }} />

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Chatty Ai
                    </Typography>




                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex', gap: 9 } }}>

                        <Tooltip title="Export chat">
                            <IconButton onClick={() => handleExportToExcel()} size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge>
                                    <IosShareIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        {/* <Tooltip title="Notifications">

                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={6} color={state?.darkMode ? "secondary" : "warning"}>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip> */}


                        <Tooltip title={!arhamic ? "English" : "Arhamic"}>

                            <IconButton
                                onClick={() => setArhamic(!arhamic)}
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={!arhamic ? "English" : "Arhamic"} color={state?.darkMode ? "secondary" : "warning"}>

                                    {!arhamic ?

                                        <PublicIcon />
                                        :
                                        <TranslateIcon />

                                    }
                                </Badge>
                            </IconButton>
                        </Tooltip>



                        <Tooltip title="Setting">

                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleSettingMenuOpen}
                                color="inherit"
                            >




                                <Badge>
                                    <SettingsIcon />
                                </Badge>


                            </IconButton>
                        </Tooltip>


                        <Tooltip title="Profile">

                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >




                                <Badge>
                                    <Avatar sx={{ height: 28, width: 28, fontSize: "1.5rem" }} alt={state?.currentUser?.displayName} src="{state?.currentUser?.photoURL}" />
                                </Badge>


                            </IconButton>
                        </Tooltip>


                        <Tooltip title={state?.darkMode ? "Switch to Light mode" : "Switch to Dark mode"}>

                            <IconButton
                                onClick={() => dispatch(switchMode())}
                                sx={{ marginLeft: "3rem", marginLeft: "3rem" }}
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge>
                                    {
                                        state?.darkMode ?
                                            <LightModeOutlinedIcon />
                                            :
                                            <DarkModeOutlinedIcon />

                                    }
                                </Badge>
                            </IconButton>
                        </Tooltip>


                    </Box>



                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>

            {renderMobileMenu}
            {renderMenu}
            {renderSetting}
        </Box>

    );
}