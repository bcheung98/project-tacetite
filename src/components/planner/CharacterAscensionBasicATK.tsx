import * as React from "react"
import { useDispatch } from "react-redux"
import parse from "html-react-parser"
import Xarrow from "react-xarrows"

// MUI imports
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Avatar } from "@mui/material"

// Helper imports
import { CustomSwitch } from "../../helpers/CustomSwitch"
import { CustomTooltip } from "../../helpers/CustomTooltip"
import { updateCharacterCosts } from "../../redux/reducers/AscensionPlannerReducer"

const CharacterAscensionBasicATK = (props: any) => {

    const theme = useTheme()

    const dispatch = useDispatch()

    let { name, element, weapon, forte } = props.character

    React.useEffect(() => {
        dispatch(updateCharacterCosts([name, "attack", []]))
    })

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
                <CustomTooltip title={parse(forte.attack.nodes[1].description)} arrow placement="top">
                    <Avatar
                        id={`${name}-attack_node2`}
                        src={`${process.env.REACT_APP_URL}/stat_icons/${forte.attack.nodes[1].type}.png`}
                        alt={forte.attack.nodes[1].type}
                        sx={skillIconSmall}
                        style={selectedNode2 ? { opacity: "1" } : { opacity: "0.35" }}
                        onClick={handleSelectNode2}
                    >
                        <img src={`${process.env.REACT_APP_URL}/images/Unknown.png`} alt="Unknown" style={{ width: "48px", backgroundColor: `${theme.paper.backgroundColor}` }} />
                    </Avatar>
                </CustomTooltip>
                <Xarrow start={`${name}-attack_node2`} end={`${name}-attack_node1`} showHead={false} path="grid" color="lightgray" strokeWidth={3} />
            </Box>
            <Box
                sx={{
                    display: "block",
                    mx: "auto",
                    width: "45%",
                    alignItems: "center",
                }}
            >
                <CustomTooltip title={parse(forte.attack.nodes[0].description)} arrow placement="top">
                    <Avatar
                        id={`${name}-attack_node1`}
                        src={`${process.env.REACT_APP_URL}/stat_icons/${forte.attack.nodes[0].type}.png`}
                        alt={forte.attack.nodes[0].type}
                        sx={skillIconSmall}
                        style={selectedNode1 ? { opacity: "1" } : { opacity: "0.35" }}
                        onClick={handleSelectNode1}
                    >
                        <img src={`${process.env.REACT_APP_URL}/images/Unknown.png`} alt="Unknown" style={{ width: "48px", backgroundColor: `${theme.paper.backgroundColor}` }} />
                    </Avatar>
                </CustomTooltip>
                <Xarrow start={`${name}-attack_node1`} end={`${name}-attack_node0`} showHead={false} path="grid" color="lightgray" strokeWidth={3} />
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
                    id={`${name}-attack_node0`}
                    src={`${process.env.REACT_APP_URL}/weapons/icons/${weapon}.png`}
                    alt={forte.attack.nodes[0].type}
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
                    Basic Attack
                </Typography>
                <CustomSwitch checked={selectedMainNode} onChange={handleSelectMainNode} element={element} />
            </Box>
        </React.Fragment>
    )

}

export default CharacterAscensionBasicATK