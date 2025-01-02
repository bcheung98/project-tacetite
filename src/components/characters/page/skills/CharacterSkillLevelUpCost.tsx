// Component imports
import Dropdown from "custom/Dropdown";
import LevelUpCosts from "custom/LevelUpCosts";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { getElementColor } from "helpers/elementColors";

// Type imports
import { CharacterSkillLevelUpProps } from "./CharacterSkillTab";

function CharacterSkillLevelUpCost({
    type,
    skillKey,
    element,
    materials,
}: CharacterSkillLevelUpProps) {
    const theme = useTheme();

    return (
        <Dropdown
            title={type === "skill" ? "Level Up Cost" : "Unlock Cost"}
            iconColor={getElementColor(theme, element)}
            contentPadding="16px 24px 0px 24px"
        >
            <LevelUpCosts
                type="character"
                name=""
                skillKey={skillKey}
                element={element}
                mats={materials}
                threshold="@250"
            />
        </Dropdown>
    );
}

export default CharacterSkillLevelUpCost;
