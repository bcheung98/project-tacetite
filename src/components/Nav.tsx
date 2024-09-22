import React from "react"

// MUI imports
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles"
import { Toolbar, Typography, CardHeader, Avatar, ButtonBase, IconButton, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, ListItemIcon, Divider, Collapse } from "@mui/material"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

// Helper imports
import { CustomTooltip } from "../helpers/CustomTooltip"

const drawerWidth = 240 //px
const buttonHoverWidth = drawerWidth * 0.9 // px
const iconSize = 32 //px

function Nav() {

    const theme = useTheme()

    let initialDrawerState = window.location.href.endsWith(".gg/") ? true : false
    const [drawerOpen, setDrawerOpen] = React.useState(initialDrawerState)
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
                    <CustomTooltip title="Irminsul.GG Home" arrow placement="right" enterDelay={250}>
                        <ButtonBase disableRipple href="https://irminsul.gg/">
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
                                            fontFamily: "Bungee, Roboto",
                                            fontSize: "16pt",
                                            letterSpacing: ".1rem",
                                            color: `white`
                                        }}
                                    >
                                        Irminsul.GG
                                    </Typography>
                                }
                                sx={{ px: 0 }}
                            />
                        </ButtonBase>
                    </CustomTooltip>
                </Toolbar>
            </AppBar>
            <Drawer
                id="drawer"
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
                                        <CustomTooltip title={!drawerOpen ? item.primaryText : null} arrow placement="right">
                                            <ListItemAvatar
                                                sx={[
                                                    { minWidth: 0, justifyContent: "center" },
                                                    drawerOpen ?
                                                        { mr: 2.5 }
                                                        :
                                                        { mr: "auto" },
                                                ]}
                                            >
                                                {item.primaryIcon}
                                            </ListItemAvatar>
                                        </CustomTooltip>
                                        <ListItemText
                                            primary={item.primaryText}
                                            primaryTypographyProps={{ color: `${theme.text.color}`, fontSize: "11pt", fontWeight: "600", fontFamily: "Segoe UI, Roboto" }}
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
                                    primaryTypographyProps={{ color: `${theme.text.color}`, fontSize: "11pt", fontWeight: "600", fontFamily: "Segoe UI, Roboto" }}
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
                                                    <CustomTooltip title={!drawerOpen ? item.primaryText : null} arrow placement="right">
                                                        <ListItemAvatar
                                                            sx={[
                                                                { minWidth: 0, justifyContent: "center" },
                                                                drawerOpen ?
                                                                    { mr: 2.5 }
                                                                    :
                                                                    { mr: "auto" },
                                                            ]}
                                                        >
                                                            {item.primaryIcon}
                                                        </ListItemAvatar>
                                                    </CustomTooltip>
                                                    <ListItemText
                                                        primary={item.primaryText}
                                                        primaryTypographyProps={{ color: `${theme.text.color}`, fontSize: "11pt", fontWeight: "600", fontFamily: "Segoe UI, Roboto" }}
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

export default Nav

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

const linkItems = [
    {
        primaryIcon: <Avatar variant="square" src="https://assets.irminsul.gg/main/game-icons/Genshin.png" alt="genshin.irminsul.gg" sx={{ width: iconSize, height: iconSize, borderRadius: "5px" }} />,
        primaryText: "Genshin Impact",
        link: "https://genshin.irminsul.gg/"
    },
    {
        primaryIcon: <Avatar variant="square" src="https://assets.irminsul.gg/main/game-icons/HSR.png" alt="hsr.irminsul.gg" sx={{ width: iconSize, height: iconSize, borderRadius: "5px" }} />,
        primaryText: "Honkai: Star Rail",
        link: "https://hsr.irminsul.gg/"
    }
]

const navItems = [
    {
        primaryIcon: <Avatar src={(`${process.env.REACT_APP_URL}/icons/Black_Shores.png`)} alt="Home" sx={{ width: `${iconSize}px`, height: `${iconSize}px` }} />,
        primaryText: "Home",
        link: `${process.env.REACT_APP_BASENAME}/`
    },
    {
        primaryIcon: <Avatar src={(`${process.env.REACT_APP_URL}/icons/Character.png`)} alt="Resonators" sx={{ width: `${iconSize}px`, height: `${iconSize}px` }} />,
        primaryText: "Resonators",
        link: `${process.env.REACT_APP_BASENAME}/characters/`
    },
    {
        primaryIcon: <Avatar src={(`${process.env.REACT_APP_URL}/icons/Weapon.png`)} alt="Weapons" sx={{ width: `${iconSize}px`, height: `${iconSize}px` }} />,
        primaryText: "Weapons",
        link: `${process.env.REACT_APP_BASENAME}/weapons/`
    },
    {
        primaryIcon: <Avatar src={(`${process.env.REACT_APP_URL}/icons/Echo.png`)} alt="Echoes" sx={{ width: `${iconSize}px`, height: `${iconSize}px` }} />,
        primaryText: "Echoes",
        link: `${process.env.REACT_APP_BASENAME}/echoes/`
    },
    {
        primaryIcon: <Avatar src={(`${process.env.REACT_APP_URL}/icons/Ascension.png`)} alt="Ascension" sx={{ width: `${iconSize}px`, height: `${iconSize}px` }} />,
        primaryText: "Ascension Planner",
        link: `${process.env.REACT_APP_BASENAME}/planner/`
    }
]