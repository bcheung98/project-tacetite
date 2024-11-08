import React from "react"
import parse from "html-react-parser"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, CardHeader, Chip } from "@mui/material"
import Grid from "@mui/material/Grid2/Grid2"

// Helper imports
import { CustomSwitch } from "../_styled/StyledSwitch"
import { CustomSlider } from "../_styled/StyledSlider"
import { SonataEffects } from "../../data/SonataEffects"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const EchoPopup = (props: any) => {

    const theme = useTheme()

    let { name, code, cost, skill, sonata, description } = props.echo

    let minValue = 2
    let maxValue = 5
    const [sliderValue, setSliderValue] = React.useState(5)
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number)
    }
    let targets = document.getElementsByClassName("text-refinement")
    skill.scaling.forEach((subScaling: string[], index: number) => {
        let target = targets[index]
        if (target !== undefined) { target.innerHTML = subScaling[sliderValue - 1] }
    })

    const [selected, setSelected] = React.useState(false)
    const handleSelect = () => {
        setSelected(!selected)
    }

    let URL
    if (!selected) {
        URL = `${process.env.REACT_APP_URL}/echoes/icons/${name.split(" ").join("_")}.png`
    }
    else {
        URL = `${process.env.REACT_APP_URL}/echoes/icons/${name.split(" ").join("_")}_Phantom.png`
    }

    return (
        <Box
            sx={{
                width: "70vw",
                p: "15px",
                backgroundColor: "rgb(26, 22, 24)",
                border: `2px solid ${theme.border.color}`,
                borderRadius: "5px",
            }}
        >
            <Grid container sx={{ mt: "10px" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            ml: "15px",
                            mr: "25px",
                        }}
                    >
                        <img
                            src={URL}
                            alt={name}
                            style={{
                                backgroundColor: `${theme.materialImage.backgroundColor}`,
                                backgroundSize: "100%",
                                border: `1px solid ${theme.border.color}`,
                                borderRadius: "15px",
                                width: "256px",
                                height: "256px",
                            }}
                            onError={ErrorLoadingImage}
                        />
                        {
                            props.echo.hasPhantom &&
                            <Box sx={{ display: "flex", alignItems: "center", mt: "5px" }}>
                                <CustomSwitch checked={selected} onChange={handleSelect} element="" />
                                <Typography variant="body1" sx={{ fontWeight: "bold", color: `${theme.text.color}`, mt: "-3px", ml: "5px" }} >
                                    Phantom
                                </Typography>
                            </Box>
                        }
                        <Box
                            sx={{
                                maxWidth: "250px",
                                maxHeight: "350px",
                                overflowY: "auto",
                                pl: "5px",
                                pr: "10px",
                                my: "20px"
                            }}
                        >
                            <Typography variant="body2" sx={{ color: `${theme.text.color}` }}>
                                {parse(description)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Grid size="grow">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: "15px",
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: "bold", color: `${theme.text.color}` }} >
                            {props.echo.displayName ? props.echo.displayName : name} ({code})
                        </Typography>
                    </Box>
                    <Box sx={{ mb: "10px" }}>
                        <Chip
                            label={
                                <Typography sx={{ fontWeight: "500", color: `${theme.text.color}` }} variant="body1">
                                    {props.echo.class} Class
                                </Typography>
                            }
                            sx={{
                                px: "5px",
                                mr: "10px",
                                mb: "10px",
                                backgroundColor: EchoChipColor(props.echo.class)
                            }}
                        />
                        <Chip
                            label={
                                <Typography sx={{ fontWeight: "500", color: `${theme.text.color}` }} variant="body1">
                                    Cost: {cost}
                                </Typography>
                            }
                            sx={{
                                px: "5px",
                                mr: "10px",
                                mb: "10px",
                                backgroundColor: `${theme.chip.color}`
                            }}
                        />
                        {
                            // props.echo.type !== "" &&
                            // <Chip
                            //     label={
                            //         <Typography sx={{ fontWeight: "500", color: `${theme.text.color}` }} variant="body1">
                            //             {type}
                            //         </Typography>
                            //     }
                            //     sx={ChipStyle}
                            // />
                        }
                    </Box>
                    <Box
                        sx={{
                            p: 2,
                            mb: "20px",
                            backgroundColor: `${theme.paper.backgroundColor}`,
                            border: `1px solid ${theme.border.color}`,
                            borderRadius: "5px",
                        }}
                    >
                        <CardHeader
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                ml: "-10px",
                            }}
                            avatar={
                                <img
                                    src={`${process.env.REACT_APP_URL}/echoes/skills/${name.split(" ").join("_")}.png`}
                                    alt={name}
                                    style={{
                                        width: "64px",
                                        height: "64px",
                                        border: `2px solid ${theme.border.color}`,
                                        borderRadius: "64px"
                                    }}
                                    onError={ErrorLoadingImage}
                                />
                            }
                            title={
                                <Typography variant="h5" sx={{ fontWeight: "bold", color: `${theme.text.color}`, mb: "5px" }} >
                                    Echo Skill
                                </Typography>
                            }
                        />
                        <Typography variant="body1" sx={{ color: `${theme.text.color}`, mb: "20px" }} >
                            {parse(skill.description)}
                        </Typography>
                        <Typography variant="body1" sx={{ color: `${theme.text.color}`, mb: "10px" }} >
                            Cooldown: <b className="text-highlight">{skill.cooldown}s</b>
                        </Typography>
                        {
                            skill.scaling.length > 0 &&
                            <Box sx={{ width: "20%" }}>
                                <Typography sx={{ color: `${theme.text.star}`, textShadow: "#e3721b 1px 1px 10px", fontSize: "20pt", userSelect: "none" }} variant="h6">
                                    {[...Array(sliderValue).keys()].map(() => "✦ ")}
                                </Typography>
                                <CustomSlider value={sliderValue} step={1} min={minValue} max={maxValue} onChange={handleSliderChange} element="" sx={{ ml: "5px" }} />
                            </Box>
                        }
                    </Box>
                    <Box
                        sx={{
                            p: 2,
                            backgroundColor: `${theme.paper.backgroundColor}`,
                            border: `1px solid ${theme.border.color}`,
                            borderRadius: "5px",
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: `${theme.text.color}`, mb: "10px" }} >
                            Sonata Effect
                        </Typography>
                        {
                            sonata.map((sonata: string, index: number) => (
                                <CardHeader
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        ml: "-10px",
                                    }}
                                    avatar={
                                        <img
                                            src={`${process.env.REACT_APP_URL}/echoes/sonata/${sonata.split(" ").join("_")}.png`}
                                            alt={sonata}
                                            style={{ width: "64px", height: "64px" }}
                                            onError={ErrorLoadingImage}
                                        />
                                    }
                                    title={
                                        <React.Fragment>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", color: `${theme.text.color}` }}>
                                                {sonata}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: `${theme.text.color}` }}>
                                                2-Pc: {parse(SonataEffects[sonata as keyof typeof SonataEffects]["2pc"])}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: `${theme.text.color}` }}>
                                                5-Pc: {parse(SonataEffects[sonata as keyof typeof SonataEffects]["5pc"])}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            ))
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )

}

export default EchoPopup

export const EchoChipColor = (echoClass: string) => {

    const theme = useTheme()

    switch (echoClass) {
        case "Calamity":
            return "rgb(255, 69, 69)"
        case "Overlord":
            return "rgb(205, 163, 65)"
        case "Elite":
            return "rgb(35, 137, 50)"
        case "Common":
            return "rgb(140, 140, 140)"
        default:
            return `${theme.chip.color}`
    }

}