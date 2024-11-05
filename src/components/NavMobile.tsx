import React from "react"

// MUI imports
import { useTheme, AppBar, Toolbar, Typography, Container, ButtonBase, Avatar, IconButton, SwipeableDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, CardHeader, Box } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

// Type imports
import { NavProps } from "./Nav"

function NavMobile({ onHomePage, navItems, linkItems }: NavProps) {

    const theme = useTheme()

    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === "keydown" &&
                    ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
                ) {
                    return
                }
                setDrawerOpen(open)
            }

    return (
        <AppBar position="fixed"
            sx={{
                backgroundColor: `${theme.appbar.backgroundColor}`,
                borderBottom: `1px solid ${theme.border.colorAlt}`
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton
                        size="large"
                        color="inherit"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        anchor="top"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        sx={{ [`& .MuiDrawer-paper`]: { backgroundColor: `${theme.appbar.backgroundColor}`, borderBottom: `2px solid ${theme.border.color}`, height: "100%", overflowX: "hidden" } }}
                    >
                        <Box sx={{ mt: -1 }}>
                            <List>
                                <ListItem disablePadding sx={{ display: "block", ml: "15px" }}>
                                    <IconButton
                                        size="large"
                                        onClick={toggleDrawer(false)}
                                        sx={{ mr: 2, color: `white` }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
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
                                </ListItem>
                                <Divider sx={{ mb: "5px" }} />
                                {
                                    navItems.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            disablePadding
                                            sx={{ display: "block", ml: "8px" }}
                                        >
                                            <ButtonBase href={item.link}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        {item.icon}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={item.text}
                                                        primaryTypographyProps={{ color: `${theme.text.color}`, fontFamily: `${theme.font.styled.family}`, fontWeight: 600, fontSize: "10pt" }}
                                                    />
                                                </ListItemButton>
                                            </ButtonBase>
                                        </ListItem>
                                    ))
                                }
                            </List>
                            <Divider />
                            <List>
                                <ListItem
                                    sx={{ display: "block", ml: "7px" }}
                                >
                                    <ListItemText
                                        primary="Other Games"
                                        primaryTypographyProps={{ color: `${theme.text.color}`, fontFamily: `${theme.font.styled.family}`, fontWeight: 600, fontSize: "10pt" }}
                                    />
                                </ListItem>
                                {
                                    linkItems.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            disablePadding
                                            sx={{ display: "block", ml: "8px" }}
                                        >
                                            <ButtonBase href={item.link}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        {item.icon}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={item.text}
                                                        primaryTypographyProps={{ color: `${theme.text.color}`, fontFamily: `${theme.font.styled.family}`, fontWeight: 600, fontSize: "10pt" }}
                                                    />
                                                </ListItemButton>
                                            </ButtonBase>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Box>
                    </SwipeableDrawer>
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
                </Toolbar>
            </Container>
        </AppBar>
    )

}

export default NavMobile