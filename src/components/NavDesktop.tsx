import React from "react"

// MUI imports
import { styled, useTheme, Theme, CSSObject, Toolbar, Typography, CardHeader, Avatar, ButtonBase, IconButton, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, ListItemIcon, Divider, Collapse, Box } from "@mui/material"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

// Helper imports
import { CustomTooltip } from "./_styled/StyledTooltip"

// Type imports
import { NavProps } from "./Nav"

const drawerWidth = 240 //px
const buttonHoverWidth = drawerWidth * 0.9 // px
const iconSize = 32 //px

function NavDesktop({ onHomePage, navItems, linkItems }: NavProps) {

    const theme = useTheme()

    const [drawerOpen, setDrawerOpen] = React.useState(onHomePage)
    const toggleDrawerState = () => {
        setDrawerOpen(!drawerOpen)
    }

    const [dropdownOpen, setDropdownOpen] = React.useState(false)
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <React.Fragment>
            <AppBar position="fixed"
                sx={{
                    backgroundColor: `${theme.appbar.backgroundColor}`,
                    borderBottom: `1px solid ${theme.border.color}`
                }}
            >
                <Toolbar>
                    <Box sx={{ display: "flex", flexGrow: 0.97 }}>
                        <IconButton
                            onClick={toggleDrawerState}
                            sx={{ color: `${theme.text.color}`, ml: "-10px", mr: "15px" }}
                        >
                            {
                                drawerOpen ?
                                    <MenuOpenIcon />
                                    :
                                    <MenuOpenIcon sx={{ transform: "rotate(180deg)" }} />
                            }
                        </IconButton>
                        <ButtonBase disableRipple href={onHomePage ? "https://irminsul.gg/" : `${process.env.REACT_APP_BASENAME}/`}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        variant="square"
                                        src="https://assets.irminsul.gg/main/icons/Irminsul.png"
                                        alt="irminsul.gg"
                                        sx={{
                                            height: "48px",
                                            width: "48px"
                                        }}
                                    />
                                }
                                title={
                                    <Typography
                                        sx={{
                                            fontFamily: "Rowdies, styled, Roboto",
                                            fontSize: "16pt",
                                            fontWeight: 400,
                                            letterSpacing: ".1rem",
                                            color: `white`
                                        }}
                                    >
                                        IRMINSUL.GG
                                    </Typography>
                                }
                                sx={{ px: 0 }}
                            />
                        </ButtonBase>
                    </Box>

                    {/* Theme Settings */}
                    {/* <Box>
                        <IconButton
                            onClick={handleSettingsClick}
                            size="small"
                            sx={{ ml: 2, color: `white` }}
                        >
                            <SettingsIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={settingsOpen}
                            onClose={handleSettingsClose}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <Box sx={{ p: 1 }}>
                                <Typography sx={{ fontFamily: `${theme.font.styled.family}`, fontSize: "11pt", textAlign: "center", mb: "10px" }}>Theme</Typography>
                                <Select value={props.themeIndex} label="Theme" input={<CustomInput />} onChange={(e) => dispatch(setTheme(Number(e.target.value)))}>
                                    {
                                        themes.map((t, index) => (
                                            <CustomMenuItem value={index} key={index} onClick={handleSettingsClose}>
                                                <Typography sx={{ fontFamily: `${theme.font.styled.family}`, fontSize: "11pt", textAlign: "center" }}>{t.name}</Typography>
                                            </CustomMenuItem>
                                        ))
                                    }
                                </Select>
                            </Box>
                        </Menu>
                    </Box> */}

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={drawerOpen}
                sx={{ [`& .MuiDrawer-paper`]: { borderRight: `1px solid ${theme.border.color}`, backgroundColor: `${theme.appbar.backgroundColor}`, pt: 2.5 } }}
            >
                {/* Empty toolbar necessary for content to be below app bar */}
                <Toolbar />
                <List>
                    {
                        navItems.map((item, index) => (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{ mx: "13px" }}
                            >
                                <ButtonBase disableRipple href={item.link}>
                                    <ListItemButton
                                        disableTouchRipple
                                        sx={[
                                            {
                                                px: "4px",
                                                py: 0,
                                                borderRadius: "5px",
                                                "&:hover": {
                                                    backgroundColor: `${theme.table.body.hover}`
                                                }
                                            },
                                            drawerOpen ?
                                                {
                                                    width: `${buttonHoverWidth}px`,
                                                    height: "50px",
                                                    my: 0,
                                                    justifyContent: "initial"
                                                }
                                                :
                                                {
                                                    width: `calc(${iconSize}px + ${iconSize * 0.25}px)`,
                                                    height: `calc(${iconSize}px + ${iconSize * 0.25}px)`,
                                                    my: "5px",
                                                    justifyContent: "center"
                                                }
                                        ]}
                                    >
                                        <CustomTooltip title={!drawerOpen ? item.text : null} arrow placement="right">
                                            <ListItemAvatar
                                                sx={[
                                                    { minWidth: 0, justifyContent: "center" },
                                                    drawerOpen ?
                                                        { mr: 2.5 }
                                                        :
                                                        { mr: "auto" },
                                                ]}
                                            >
                                                {item.icon}
                                            </ListItemAvatar>
                                        </CustomTooltip>
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{ color: `${theme.text.color}`, fontFamily: `${theme.font.styled.family}`, fontWeight: theme.font.styled.weight, fontSize: "11pt" }}
                                            sx={[
                                                drawerOpen ?
                                                    { opacity: 1 }
                                                    :
                                                    { opacity: 0 }
                                            ]}
                                        />
                                    </ListItemButton>
                                </ButtonBase>
                            </ListItem>
                        ))
                    }
                </List>
                <Divider variant="middle" />
                <List>
                    <ListItem
                        disablePadding
                        sx={{ mx: "17px" }}
                    >
                        <ButtonBase disableRipple onClick={toggleDropdownState}>
                            <ListItemButton
                                disableTouchRipple
                                sx={[
                                    {
                                        px: "4px",
                                        py: 0,
                                        borderRadius: "5px",
                                        "&:hover": {
                                            backgroundColor: `${theme.table.body.hover}`
                                        }
                                    },
                                    drawerOpen ?
                                        {
                                            width: `${drawerWidth * 0.8}px`,
                                            height: "50px",
                                            my: 0,
                                            justifyContent: "initial"
                                        }
                                        :
                                        {
                                            width: `${iconSize}px`,
                                            height: `calc(${iconSize}px + ${iconSize * 0.25}px)`,
                                            my: "5px",
                                            justifyContent: "center"
                                        }
                                ]}
                            >
                                <CustomTooltip title={!drawerOpen ? "Other Games" : null} arrow placement="right">
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: "center",
                                                color: `${theme.text.color}`
                                            },
                                            drawerOpen ?
                                                { mr: 3 }
                                                :
                                                { mr: "auto" },
                                        ]}
                                    >
                                        {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemIcon>
                                </CustomTooltip>
                                <ListItemText
                                    primary="Other Games"
                                    primaryTypographyProps={{ color: `${theme.text.color}`, fontFamily: `${theme.font.styled.family}`, fontWeight: theme.font.styled.weight, fontSize: "11pt" }}
                                    sx={[
                                        drawerOpen ?
                                            { opacity: 1 }
                                            :
                                            { opacity: 0 }
                                    ]}
                                />
                            </ListItemButton>
                        </ButtonBase>
                    </ListItem>
                    <ListItem
                        disablePadding
                        sx={{ mx: "13px" }}
                    >
                        <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                {
                                    linkItems.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            disablePadding
                                        >
                                            <ButtonBase disableRipple href={item.link}>
                                                <ListItemButton
                                                    disableTouchRipple
                                                    sx={[
                                                        {
                                                            px: "4px",
                                                            py: 0,
                                                            borderRadius: "5px",
                                                            "&:hover": {
                                                                backgroundColor: `${theme.table.body.hover}`
                                                            }
                                                        },
                                                        drawerOpen ?
                                                            {
                                                                width: `${buttonHoverWidth}px`,
                                                                height: "50px",
                                                                my: 0,
                                                                justifyContent: "initial"
                                                            }
                                                            :
                                                            {
                                                                width: `calc(${iconSize}px + ${iconSize * 0.25}px)`,
                                                                height: `calc(${iconSize}px + ${iconSize * 0.25}px)`,
                                                                my: "5px",
                                                                justifyContent: "center"
                                                            }
                                                    ]}
                                                >
                                                    <CustomTooltip title={!drawerOpen ? item.text : null} arrow placement="right">
                                                        <ListItemAvatar
                                                            sx={[
                                                                { minWidth: 0, justifyContent: "center" },
                                                                drawerOpen ?
                                                                    { mr: 2.5 }
                                                                    :
                                                                    { mr: "auto" },
                                                            ]}
                                                        >
                                                            {item.icon}
                                                        </ListItemAvatar>
                                                    </CustomTooltip>
                                                    <ListItemText
                                                        primary={item.text}
                                                        primaryTypographyProps={{ color: `${theme.text.color}`, fontFamily: `${theme.font.styled.family}`, fontWeight: theme.font.styled.weight, fontSize: "11pt" }}
                                                        sx={[
                                                            drawerOpen ?
                                                                { opacity: 1 }
                                                                :
                                                                { opacity: 0 }
                                                        ]}
                                                    />
                                                </ListItemButton>
                                            </ButtonBase>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Collapse>
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    )

}

export default NavDesktop

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `${iconSize * 2 + 1}px`,
})

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    "& .MuiDrawer-paper": openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    "& .MuiDrawer-paper": closedMixin(theme),
                },
            },
        ],
    }),
)