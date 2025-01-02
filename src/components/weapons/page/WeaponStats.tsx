import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import ToggleButtons from "custom/ToggleButtons";

// Helper imports
import { baseATKScaling, subStats } from "data/weaponStats";
import { skillDisplayButtons } from "components/Settings";

// Type imports
import { WeaponProps } from "types/weapon";
import { selectSkillDisplay, SkillDisplay } from "reducers/settings";
import { useAppSelector } from "helpers/hooks";

function WeaponStats({ weapon }: WeaponProps) {
    const { rarity, stats } = weapon;
    const { atk, subStat } = stats;

    const currentSkillDisplay = useAppSelector(selectSkillDisplay);
    const [mode, setMode] = React.useState<SkillDisplay>(currentSkillDisplay);
    const handleMode = (_: React.BaseSyntheticEvent, newView: SkillDisplay) => {
        if (newView !== null) {
            setMode(newView);
        }
    };

    let levels = [
        "1",
        "20",
        "20+",
        "40",
        "40+",
        "50",
        "50+",
        "60",
        "60+",
        "70",
        "70+",
        "80",
        "80+",
        "90",
    ];
    if (rarity < 3) {
        levels = levels.slice(0, -4);
    }

    const data = [
        ["Level", ...levels],
        ["Base ATK", ...levels.map((_, index) => baseATKScaling[atk][index] || 0)],
        [
            subStat,
            ...levels.map(
                (_, index) => (subStats[atk][subStat] as string[])[index] || 0
            ),
        ],
    ];

    React.useEffect(() => {
        setMode(currentSkillDisplay);
    }, [currentSkillDisplay]);

    return (
        <MainContentBox
            title="Stats"
            actions={
                <ToggleButtons
                    color="secondary"
                    buttons={skillDisplayButtons}
                    value={mode}
                    exclusive
                    onChange={handleMode}
                    spacing={0}
                    padding={10}
                    highlightOnHover={false}
                />
            }
        >
            <StatsTable
                mode={mode}
                levels={levels}
                data={data}
                orientation="column"
                sliderProps={{
                    sx: {
                        minWidth: "100px",
                        maxWidth: "75%",
                        ml: "8px",
                    },
                }}
                tableProps={{
                    sx: {
                        width:
                            mode === "slider"
                                ? { xs: "100%", sm: "75%" }
                                : "100%",
                    },
                }}
            />
        </MainContentBox>
    );
}

export default WeaponStats;
