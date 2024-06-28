import * as React from "react"
import parse from "html-react-parser"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Typography, Box, AppBar, CardHeader, Avatar } from "@mui/material"

// Helper imports
import { ElementalBorderColor } from "../../../helpers/ElementColors"

const CharacterResonanceChainDisplay = (props: any) => {

    const theme = useTheme()

    let { name, element, resonanceChain } = props.character

    const iconSize = "56px"

    return (
        <Box
            sx={{
                mx: "15px",
                mt: "15px",
                color: `${theme.text.color}`,
                backgroundColor: `${theme.paper.backgroundColor}`,
                border: `2px solid ${theme.border.color}`,
                borderRadius: "5px",
            }}
        >
            <AppBar position="static"
                sx={{
                    backgroundColor: `${theme.appbar.backgroundColor}`,
                    borderBottom: `2px solid ${theme.border.color}`,
                    borderRadius: "5px 5px 0px 0px",
                }}
            >
                <Typography sx={{ m: 2, color: `${theme.text.color}`, fontWeight: "bold" }} variant="h5">
                    Resonance Chain
                </Typography>
            </AppBar>
            {
                Object.keys(resonanceChain).map((key, index) => {
                    return (
                        <Box key={index}>
                            <CardHeader
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                avatar={
                                    <Avatar src={(`${process.env.REACT_APP_URL}/characters/resonance_chains/${name.split(" ").join("_").toLowerCase()}_${key}.png`)} alt={resonanceChain[key].name}
                                        sx={{
                                            width: iconSize,
                                            height: iconSize,
                                            border: `2px solid ${ElementalBorderColor(element)}`,
                                            backgroundColor: `${theme.materialImage.backgroundColor}`,
                                        }}
                                    >
                                        <img src={`${process.env.REACT_APP_URL}/images/Unknown.png`} alt="Unknown" style={{ width: iconSize, backgroundColor: `${theme.paper.backgroundColor}` }} />
                                    </Avatar>
                                }
                                title={
                                    <Box sx={{ mb: "5px" }}>
                                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                            {resonanceChain[key].name}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
                                            <i>{key.toUpperCase()}</i>
                                        </Typography>
                                    </Box>
                                }
                            />
                            <Typography variant="body1" sx={{ color: `${theme.text.color}`, mx: "20px" }}>
                                {parse(resonanceChain[key].description)}
                            </Typography>
                            <br />
                            {key !== "c6" && <hr style={{ border: `.5px solid ${theme.border.color}`, margin: "10px" }} />}
                        </Box>
                    )
                })
            }
        </Box>
    )

}

export default CharacterResonanceChainDisplay