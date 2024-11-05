import React from "react"

// Component imports
import NavDesktop from "./NavDesktop"
import NavMobile from "./NavMobile"

// MUI imports
import { useTheme, useMediaQuery, Avatar } from "@mui/material"

const iconSize = 32 //px

function Nav() {

    const theme = useTheme()

    const matches = useMediaQuery(theme.breakpoints.up("sm"))

    const onHomePage = window.location.pathname === "/"

    return (
        <React.Fragment>
            {
                matches ?
                    <NavDesktop onHomePage={onHomePage} navItems={navItems} linkItems={linkItems} />
                    :
                    <NavMobile onHomePage={onHomePage} navItems={navItems} linkItems={linkItems} />
            }
        </React.Fragment>
    )

}

export default Nav

export interface NavProps {
    onHomePage: boolean
    navItems: NavItem[]
    linkItems: NavItem[]
}

export interface NavItem {
    icon: JSX.Element,
    text: string,
    link: string
}

const navItems = [
    {
        icon: <Avatar variant="square" src={`${process.env.REACT_APP_URL}/icons/Black_Shores.png`} alt="Home" sx={{ width: `${iconSize}px`, height: `${iconSize}px` }} />,
        text: "Home",
        link: `${process.env.REACT_APP_BASENAME}/`
    },
    {
        icon: <Avatar variant="square" src={`${process.env.REACT_APP_URL}/icons/Character.png`} alt="Resonators" sx={{ width: `${iconSize}px`, height: `${iconSize}px` }} />,
        text: "Resonators",
        link: `${process.env.REACT_APP_BASENAME}/characters/`
    },
    {
        icon: <Avatar variant="square" src={`${process.env.REACT_APP_URL}/icons/Weapon.png`} alt="Weapons" sx={{ width: `${iconSize}px`, height: `${iconSize}px` }} />,
        text: "Weapons",
        link: `${process.env.REACT_APP_BASENAME}/weapons/`
    },
    {
        icon: <Avatar variant="square" src={`${process.env.REACT_APP_URL}/icons/Echo.png`} alt="Echoes" sx={{ width: `${iconSize}px`, height: `${iconSize}px` }} />,
        text: "Echoes",
        link: `${process.env.REACT_APP_BASENAME}/echoes/`
    },
    {
        icon: <Avatar variant="square" src={`${process.env.REACT_APP_URL}/icons/Ascension.png`} alt="Ascension" sx={{ width: `${iconSize}px`, height: `${iconSize}px` }} />,
        text: "Ascension Planner",
        link: `${process.env.REACT_APP_BASENAME}/planner/`
    }
]

const linkItems = [
    {
        icon: <Avatar variant="square" src="https://assets.irminsul.gg/main/game-icons/Genshin.png" alt="genshin.irminsul.gg" sx={{ width: iconSize, height: iconSize, borderRadius: "5px" }} />,
        text: "Genshin Impact",
        link: "https://genshin.irminsul.gg/"
    },
    {
        icon: <Avatar variant="square" src="https://assets.irminsul.gg/main/game-icons/HSR.png" alt="hsr.irminsul.gg" sx={{ width: iconSize, height: iconSize, borderRadius: "5px" }} />,
        text: "Honkai: Star Rail",
        link: "https://hsr.irminsul.gg/"
    }
]