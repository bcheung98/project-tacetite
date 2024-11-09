import React from "react"
import parse from "html-react-parser"

// Component imports
import Image from "../_custom/Image"
import { CustomSwitch } from "../_styled/StyledSwitch"
import { CustomSlider } from "../_styled/StyledSlider"

// MUI imports
import { useTheme, useMediaQuery, Box, Typography, Chip, IconButton } from "@mui/material"
import Grid from "@mui/material/Grid2/Grid2"
import CloseIcon from "@mui/icons-material/Close"

// Helper imports
import { SonataEffectKeys, SonataEffects } from "../../data/SonataEffects"
import { GetBackgroundColor, GetRarityColor } from "../../helpers/RarityColors"
import { echoClassId } from "./EchoBrowser"

// Type imports
import { EchoProps } from "../../types/echo"

interface EchoPopupProps extends EchoProps {
    handleClose?: (arg0: any) => void
}

function EchoPopup({ echo, handleClose }: EchoPopupProps) {

    const theme = useTheme()

    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"))
    const matches_lg_up = useMediaQuery(theme.breakpoints.up("lg"))

    const { name, code, cost, skill, description } = echo

    const rarity = echoClassId[echo.class]

    function EchoImage() {

        const [selected, setSelected] = React.useState(false)
        const handleSelect = () => {
            setSelected(!selected)
        }

        const URL = !selected ? `echoes/icons/${name}` : `echoes/icons/${name}_Phantom`

        const size = matches_sm_up ? 256 : 128

        return (
            <Box>
                <Image
                    src={URL}
                    alt={name}
                    style={{
                        backgroundColor: `${theme.materialImage.backgroundColor}`,
                        boxShadow: `inset 0 0 ${size / 4}px ${size / 24}px ${GetRarityColor(rarity)}`,
                        border: `2px solid ${GetRarityColor(rarity)}`,
                        borderRadius: "15px",
                        width: size,
                        height: size,
                    }}
                />
                {
                    echo.hasPhantom &&
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CustomSwitch checked={selected} onChange={handleSelect} />
                        <Typography sx={{ fontWeight: theme.font.styled.weight, mt: "-3px", ml: "5px" }} >
                            Phantom
                        </Typography>
                    </Box>
                }
            </Box>
        )
    }

    function EchoInfo() {

        const echo_name = echo.displayName ? echo.displayName : name

        const chipStyle = {
            mr: "10px",
            mb: "10px",
            height: { xs: "24px", sm: "32px" },
        }

        const chipText = {
            fontFamily: theme.font.styled.family,
            fontSize: { xs: "12px", sm: "16px" },
        }

        return (
            <Box sx={{ mb: "5px", mr: "25px" }}>
                <Typography
                    sx={{
                        fontFamily: theme.font.styled.family,
                        fontWeight: theme.font.styled.weight,
                        fontSize: matches_sm_up ? "32px" : "20px",
                        mb: "10px"
                    }}
                >
                    {`${echo_name} (${code})`}
                </Typography>
                <Chip
                    label={
                        <Typography sx={chipText}>
                            {echo.class} Class
                        </Typography>
                    }
                    sx={{ ...chipStyle, ...{ backgroundColor: GetBackgroundColor(rarity) } }}
                />
                <Chip
                    label={
                        <Typography sx={chipText}>
                            Cost: {cost}
                        </Typography>
                    }
                    sx={{ ...chipStyle, ...{ backgroundColor: theme.chip.color } }}
                />
            </Box>
        )

    }

    function SplashText() {
        return (
            <Box
                sx={{
                    maxWidth: { xs: "auto", lg: "256px" },
                    maxHeight: { xs: "128px", sm: "256px", lg: "300px" },
                    overflowY: "auto",
                    px: "10px",
                    mt: { xs: 0, lg: "15px" },
                    mx: { md: "10px", lg: 0 }
                }}
            >
                <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                    {parse(description)}
                </Typography>
            </Box>
        )
    }

    function EchoSkill() {

        const [sliderValue, setSliderValue] = React.useState(5)
        const handleSliderChange = (event: Event, newValue: number | number[]) => {
            setSliderValue(newValue as number)
        }
        const targets = document.getElementsByClassName("text-refinement")
        skill.scaling.forEach((subScaling: string[], index: number) => {
            let target = targets[index]
            if (target !== undefined) { target.innerHTML = subScaling[sliderValue - 1] }
        })

        const values = [2, 3, 4, 5]
        const marks = values.map(rarity => ({
            value: rarity,
            label:
                <Typography sx={{ color: `${theme.text.star}`, textShadow: "#e3721b 1px 1px 10px", ml: "15px", fontSize: { xs: "16px", sm: "18px" }, userSelect: "none" }}>
                    {`${rarity}✦`}
                </Typography>
        }))

        return (
            <Box
                sx={{
                    backgroundColor: `${theme.materialImage.backgroundColor}`,
                    border: `1px solid ${theme.border.color}`,
                    borderRadius: "5px",
                    color: `${theme.text.color}`,
                    overflowY: "auto",
                    p: 2.5,
                    mb: "15px"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", mb: "15px" }}>
                    <Image
                        src={`echoes/skills/${name}`}
                        alt={name}
                        style={{
                            width: matches_sm_up ? "48px" : "40px",
                            height: matches_sm_up ? "48px" : "40px",
                            padding: "4px",
                            marginRight: "10px",
                            border: `1px solid ${theme.border.color}`,
                            borderRadius: "64px",
                            backgroundColor: theme.paper.backgroundColor
                        }}
                    />
                    <Typography sx={{ fontWeight: theme.font.styled.weight, fontSize: { xs: "16px", sm: "20px" }, mb: "5px" }}>
                        Echo Skill
                    </Typography>
                </Box>
                <Typography sx={{ fontSize: { xs: "14px", sm: "16px" }, mb: "20px" }}>
                    {parse(skill.description)}
                </Typography>
                <Typography sx={{ fontSize: { xs: "14px", sm: "16px" }, mb: "5px" }}>
                    Cooldown: <b className="text-highlight">{skill.cooldown}s</b>
                </Typography>
                {
                    skill.scaling.length > 0 &&
                    <Box sx={{ width: "20%" }}>
                        <CustomSlider
                            value={sliderValue}
                            marks={marks}
                            step={1}
                            min={values[0]}
                            max={values.slice(-1)[0]}
                            onChange={handleSliderChange}
                            sx={{ minWidth: "150px", ml: "5px" }}
                        />
                    </Box>
                }
            </Box>
        )

    }

    function EchoSonata() {
        return (
            <Box
                sx={{
                    backgroundColor: `${theme.materialImage.backgroundColor}`,
                    border: `1px solid ${theme.border.color}`,
                    borderRadius: "5px",
                    color: `${theme.text.color}`,
                    overflowY: "auto",
                    p: 2.5
                }}
            >
                <Typography sx={{ fontSize: { xs: "16px", sm: "20px" }, fontWeight: theme.font.styled.weight, mb: "15px" }}>
                    Sonata Effect
                </Typography>
                {
                    echo.sonata.map((sonata: string, index: number) =>
                        <Box key={index} sx={{ mb: index !== echo.sonata.length - 1 ? "20px" : 0 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: "15px" }}>
                                <Image
                                    src={`echoes/sonata/${sonata}`}
                                    alt={sonata}
                                    style={{
                                        width: matches_sm_up ? "48px" : "40px",
                                        height: matches_sm_up ? "48px" : "40px",
                                        marginRight: "10px"
                                    }}
                                />
                                <Typography sx={{ fontSize: { xs: "16px", sm: "20px" }, fontWeight: theme.font.styled.weight }}>
                                    {sonata}
                                </Typography>
                            </Box>
                            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                                2-Pc: {parse(SonataEffects[sonata as SonataEffectKeys]["2pc"])}
                            </Typography>
                            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                                5-Pc: {parse(SonataEffects[sonata as SonataEffectKeys]["5pc"])}
                            </Typography>
                        </Box>
                    )
                }
            </Box >
        )
    }

    // main
    return (
        <Box
            sx={{
                position: "relative",
                width: { xs: "100%", sm: "75vw" },
                p: "15px",
                backgroundColor: `${theme.paper.backgroundColor}`,
                border: { xs: "none", sm: `2px solid ${theme.border.color}` },
                borderRadius: "5px",
                overflowY: { xs: "none", sm: "auto" }
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    right: "0px",
                    top: "5px",
                }}
            >
                <IconButton onClick={handleClose}>
                    <CloseIcon fontSize="large" sx={{ color: `white` }} />
                </IconButton>
            </Box>
            {
                matches_lg_up ?
                    <Grid container spacing={2}>
                        <Grid size="auto">
                            <Box>
                                <EchoImage />
                                <SplashText />
                            </Box>
                        </Grid>
                        <Grid size="grow">
                            <EchoInfo />
                            <EchoSkill />
                            <EchoSonata />
                        </Grid>
                    </Grid>
                    :
                    <React.Fragment>
                        <EchoInfo />
                        <Box sx={{ display: "flex", mb: "15px" }}>
                            <EchoImage />
                            <SplashText />
                        </Box>
                        <EchoSkill />
                        <EchoSonata />
                    </React.Fragment>
            }
        </Box>
    )

}

export default EchoPopup