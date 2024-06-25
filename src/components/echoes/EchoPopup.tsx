import React from "react"
import parse from "html-react-parser"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, CardHeader, Chip } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

// Helper imports
import { CustomSwitch } from "../../helpers/CustomSwitch"
import { CustomSlider } from "../../helpers/CustomSlider"
import { SonataEffects } from "../../helpers/SonataEffects"
import { echoCosts } from "./EchoCard"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

const EchoPopup = (props: any) => {

    const theme = useTheme()

    let { name, code, skill, sonata } = props.echo

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

    const ChipStyle = {
        px: "5px",
        mr: "10px",
        mb: "10px",
        backgroundColor: "rgb(149, 134, 131)",
    }

    let URL
    if (!selected) {
        URL = `${process.env.REACT_APP_URL}/echoes/${name}.png`
    }
    else {
        URL = `${process.env.REACT_APP_URL}/echoes/${name} Phantom.png`
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
                <Grid xs={2.65}>
                    <img
                        src={URL}
                        alt={name}
                        style={{
                            backgroundColor: `${theme.materialImage.backgroundColor}`,
                            backgroundSize: "100%",
                            border: `2px solid ${theme.border.color}`,
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
                </Grid>
                <Grid xs>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: "15px",
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: "bold", color: `${theme.text.color}` }} >
                            {name} ({code})
                        </Typography>
                    </Box>
                    <Box sx={{ mb: "10px" }}>
                        <Chip
                            label={
                                <Typography sx={{ fontWeight: "500", color: `${theme.text.color}` }} variant="body1">
                                    {props.echo.class} Class
                                </Typography>
                            }
                            sx={ChipStyle}
                        />
                        <Chip
                            label={
                                <Typography sx={{ fontWeight: "500", color: `${theme.text.color}` }} variant="body1">
                                    Cost: {echoCosts[props.echo.class as keyof typeof echoCosts]}
                                </Typography>
                            }
                            sx={ChipStyle}
                        />
                    </Box>
                    <Box
                        sx={{
                            p: 2,
                            mb: "20px",
                            backgroundColor: `${theme.paper.backgroundColor}`,
                            border: `2px solid ${theme.border.color}`,
                            borderRadius: "5px",
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: "bold", color: `${theme.text.color}`, mb: "20px" }} >
                            Echo Skill
                        </Typography>
                        <Typography variant="body1" sx={{ color: `${theme.text.color}`, mb: "20px" }} >
                            {parse(skill.description)}
                        </Typography>
                        <Typography variant="body1" sx={{ color: `${theme.text.color}`, mb: "10px" }} >
                            Cooldown: <b className="text-highlight">{skill.cooldown}s</b>
                        </Typography>
                        {
                            skill.scaling.length > 0 &&
                            <Box sx={{ width: "20%" }}>
                                <Typography sx={{ color: "rgb(255, 208, 112)", textShadow: "#e3721b 1px 1px 10px", fontSize: "20pt", userSelect: "none" }} variant="h6">
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
                            border: `2px solid ${theme.border.color}`,
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
                                            src={`${process.env.REACT_APP_URL}/echoes/sonata/${sonata}.png`}
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