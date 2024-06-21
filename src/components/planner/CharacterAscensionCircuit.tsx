import * as React from "react"
import parse from "html-react-parser"
import Xarrow from "react-xarrows"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Avatar } from "@mui/material"

// Helper imports
import { CustomSwitch } from "../../helpers/CustomSwitch"
import { CustomTooltip } from "../../helpers/CustomTooltip"

const CharacterAscensionCircuit = (props: any) => {

    const theme = useTheme()

    let { name, element, forte } = props.character

    const [selectedMainNode, setSelectedMainNode] = React.useState(true);
    const handleSelectMainNode = () => {
        setSelectedMainNode(!selectedMainNode)
    }
    const [selectedNode1, setSelectedNode1] = React.useState(true);
    const handleSelectNode1 = () => {
        setSelectedNode1(!selectedNode1)
    }

    const [selectedNode2, setSelectedNode2] = React.useState(true);
    const handleSelectNode2 = () => {
        setSelectedNode2(!selectedNode2)
    }

    const skillIcon = {
        width: "48px",
        height: "48px",
        marginBottom: "15px",
        border: `2px solid ${theme.border.color}`,
        borderRadius: "48px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
    }

    const skillIconSmall = {
        width: "32px",
        height: "32px",
        marginBottom: "30px",
        border: `2px solid ${theme.border.color}`,
        borderRadius: "32px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        cursor: "pointer"
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "block",
                    mx: "auto",
                    width: "45%",
                    alignItems: "center",
                }}
            >
                <CustomTooltip title={parse(forte.circuit.nodes[1].name)} arrow placement="top">
                    <Avatar
                        id="circuit_node2"
                        src={`${process.env.REACT_APP_URL}/characters/skills/${name.split(" ").join("_").toLowerCase()}_passive2.png`}
                        alt={forte.circuit.nodes[1].type}
                        sx={skillIconSmall}
                        style={selectedNode2 ? { opacity: "1" } : { opacity: "0.35" }}
                        onClick={handleSelectNode2}
                    >
                        <img src={`${process.env.REACT_APP_URL}/images/Unknown.png`} alt="Unknown" style={{ width: "48px", backgroundColor: `${theme.paper.backgroundColor}` }} />
                    </Avatar>
                </CustomTooltip>
                <Xarrow start="circuit_node2" end="circuit_node1" showHead={false} path="grid" color="lightgray" strokeWidth={3} />
            </Box>
            <Box
                sx={{
                    display: "block",
                    mx: "auto",
                    width: "45%",
                    alignItems: "center",
                }}
            >
                <CustomTooltip title={parse(forte.circuit.nodes[0].name)} arrow placement="top">
                    <Avatar
                        id="circuit_node1"
                        src={`${process.env.REACT_APP_URL}/characters/skills/${name.split(" ").join("_").toLowerCase()}_passive1.png`}
                        alt={forte.circuit.nodes[0].type}
                        sx={skillIconSmall}
                        style={selectedNode1 ? { opacity: "1" } : { opacity: "0.35" }}
                        onClick={handleSelectNode1}
                    >
                        <img src={`${process.env.REACT_APP_URL}/images/Unknown.png`} alt="Unknown" style={{ width: "48px", backgroundColor: `${theme.paper.backgroundColor}` }} />
                    </Avatar>
                </CustomTooltip>
                <Xarrow start="circuit_node1" end="circuit_node0" showHead={false} path="grid" color="lightgray" strokeWidth={3} />
            </Box>
            <Box
                sx={{
                    display: "block",
                    mx: "auto",
                    width: "60%",
                    alignItems: "center",
                }}
            >
                <Avatar
                    id="circuit_node0"
                    src={`${process.env.REACT_APP_URL}/characters/skills/${name.split(" ").join("_").toLowerCase()}_circuit.png`}
                    alt={forte.circuit.nodes[0].type}
                    sx={skillIcon}
                    style={selectedMainNode ? { opacity: "1", cursor: "pointer" } : { opacity: "0.35" }}
                >
                    <img src={`${process.env.REACT_APP_URL}/images/Unknown.png`} alt="Unknown" style={{ width: "48px", backgroundColor: `${theme.paper.backgroundColor}` }} />
                </Avatar>
            </Box>
            <Box
                sx={{
                    display: "block",
                    mx: "auto",
                    width: "70%",
                    alignItems: "center",
                }}
                style={selectedMainNode ? { opacity: "1" } : { opacity: "0.35" }}
            >
                <Typography variant="body2" sx={{ color: `${theme.text.color}`, fontWeight: "bold", width: "64px", textAlign: "center" }}>
                    Forte Circuit
                </Typography>
                <CustomSwitch checked={selectedMainNode} onChange={handleSelectMainNode} element={element} />
            </Box>
        </React.Fragment>
    )

}

export default CharacterAscensionCircuit