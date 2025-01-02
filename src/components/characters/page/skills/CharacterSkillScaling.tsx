// Component imports
import Dropdown from "custom/Dropdown";
import StatsTable from "custom/StatsTable";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { getElementColor } from "helpers/elementColors";
import { range } from "helpers/utils";

// Type imports
import { CharacterSkillScalingProps } from "./CharacterSkillTab";

function CharacterSkillScaling({
    mode,
    scaling,
    element,
}: CharacterSkillScalingProps) {
    const theme = useTheme();

    const color = getElementColor(theme, element);

    const levels = 10;

    return (
        <Dropdown
            title="Skill Scaling"
            iconColor={color}
            contentPadding={mode === "slider" ? "4px 24px" : "4px 0px"}
        >
            <StatsTable
                mode={mode}
                levels={range(1, levels)}
                data={scaling}
                headColumns={["Level", ...range(1, levels)]}
                sliderProps={{
                    initialValue: 10,
                    sx: {
                        minWidth: "100px",
                        maxWidth: "500px",
                        ml: "8px",
                        color: color,
                    },
                }}
                tableProps={{
                    sx: {
                        width:
                            mode === "slider"
                                ? { sm: "100%", md: "50%" }
                                : "100%",
                        maxWidth: mode === "slider" ? { lg: "500px" } : "100%",
                        mt: "8px",
                    },
                }}
                textID="character-skill-value"
            />
        </Dropdown>
    );
}

export default CharacterSkillScaling;
