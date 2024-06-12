// MUI imports
import { useTheme } from "@mui/material/styles"
import { AppBar, Box, Toolbar, Typography, Container, ButtonBase, Avatar, CardHeader } from "@mui/material"

const Nav = () => {

    const theme = useTheme()

    return (
        <AppBar position="static"
            sx={{
                backgroundColor: `${theme.appbar.backgroundColor}`,
                borderBottom: `1px solid ${theme.border.color}`
            }}
        >
            <Container maxWidth="xl" sx={{ m: 0 }}>
                <Toolbar disableGutters>
                    <ButtonBase disableRipple href={`/project-tacetite/`}>
                        <CardHeader
                            avatar={
                                <Avatar src={`${process.env.REACT_APP_URL}/elements/Spectro.png`} alt="PROJECT TACETITE" sx={{ height: "64px", width: "64px", backgroundColor: `${theme.appbar.backgroundColor}` }} />
                            }
                            title={
                                <Typography variant="h6"
                                    sx={{
                                        mr: 2,
                                        display: { xs: "none", md: "flex" },
                                        letterSpacing: ".3rem",
                                        color: `${theme.text.color}`,
                                        textDecoration: "none",
                                    }}
                                >
                                    PROJECT TACETITE
                                </Typography>
                            }
                        />
                    </ButtonBase>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <ButtonBase disableRipple href={`/project-tacetite/characters`}>
                            <CardHeader
                                avatar={
                                    <Avatar src={(`${process.env.REACT_APP_URL}/icons/Character.png`)} alt="Resonators" sx={{ height: "32px", width: "32px" }} />
                                }
                                title={
                                    <Typography variant="body2"
                                        sx={{
                                            letterSpacing: ".1rem",
                                            color: `${theme.text.color}`,
                                            textDecoration: "none",
                                            fontWeight: "500",
                                        }}
                                    >
                                        RESONATORS
                                    </Typography>
                                }
                            />
                        </ButtonBase>
                        <ButtonBase disableRipple href={`/project-tacetite/weapons`}>
                            <CardHeader
                                avatar={
                                    <Avatar src={(`${process.env.REACT_APP_URL}/icons/Weapon.png`)} alt="Weapons" sx={{ height: "32px", width: "32px" }} />
                                }
                                title={
                                    <Typography variant="body2"
                                        sx={{
                                            letterSpacing: ".1rem",
                                            color: `${theme.text.color}`,
                                            textDecoration: "none",
                                            fontWeight: "500",
                                        }}
                                    >
                                        WEAPONS
                                    </Typography>
                                }
                            />
                        </ButtonBase>
                        <ButtonBase disableRipple href={`/project-tacetite/echoes`}>
                            <CardHeader
                                avatar={
                                    <Avatar src={(`${process.env.REACT_APP_URL}/icons/Echo.png`)} alt="Echoes" sx={{ height: "32px", width: "32px" }} />
                                }
                                title={
                                    <Typography variant="body2"
                                        sx={{
                                            letterSpacing: ".1rem",
                                            color: `${theme.text.color}`,
                                            textDecoration: "none",
                                            fontWeight: "500",
                                        }}
                                    >
                                        ECHOES
                                    </Typography>
                                }
                            />
                        </ButtonBase>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )

}

export default Nav