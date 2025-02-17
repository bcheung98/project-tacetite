// Component imports
import LevelSlider from "./LevelSlider";
import StatNode from "./StatNode";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { Divider, Stack, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { range } from "helpers/utils";
import { elements } from "data/common";
import { getElementColor } from "helpers/elementColors";
import { characterBonusStats } from "data/characterBonusStats";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";

// Type imports
import {
    CharacterCostObject,
    CostSliderData,
    UpdateCostsPayload,
} from "types/costs";
import { CardMode } from "./PlannerCard";
import { BonusStat, Character } from "types/character";
import { Element } from "types/_common";

function CharacterSliders({
    character,
    mode,
}: {
    character: CharacterCostObject;
    mode: CardMode;
}) {
    const theme = useTheme();

    const name = character.name.toLowerCase();
    const char = useAppSelector(selectCharacters).find(
        (c) => c.name === character.name
    ) as Character;
    const values = character.values;

    const sliders: {
        title: string;
        icon?: string;
        levels: (string | number)[];
        type: UpdateCostsPayload["type"];
        values: CostSliderData;
    }[] = [
        {
            title: "Level",
            levels: charLevel,
            type: "level",
            values: values.level,
        },
        {
            title: "Normal Attack",
            icon: `characters/skills/basic_attacks/${character.weapon}`,
            levels: skillLevel,
            type: "attack",
            values: values.attack,
        },
        {
            title: "Resonance Skill",
            icon: `characters/skills/${name}_skill`,
            levels: skillLevel,
            type: "skill",
            values: values.skill,
        },
        {
            title: "Resonance Liberation",
            icon: `characters/skills/${name}_ultimate`,
            levels: skillLevel,
            type: "ultimate",
            values: values.ultimate,
        },
        {
            title: "Forte Circuit",
            icon: `characters/skills/${name}_circuit`,
            levels: skillLevel,
            type: "circuit",
            values: values.circuit,
        },
        {
            title: "Intro Skill",
            icon: `characters/skills/${name}_intro`,
            levels: skillLevel,
            type: "intro",
            values: values.intro,
        },
    ];

    const nodes: {
        icon: string;
        type: UpdateCostsPayload["type"];
        title: React.ReactNode;
        values: CostSliderData;
    }[][] = [
        [
            {
                icon: `characters/skills/${name}_passive2`,
                type: "passive2",
                title: "Inherent Skill 2",
                values: values.passive2,
            },
            ...[2, 4, 6, 8].map((node, index) => ({
                icon: `stat_icons/${char.bonusStats[getStatIndex(index)]}`,
                type: `bonusStat${node}` as UpdateCostsPayload["type"],
                title: (
                    <TooltipText
                        bonusStat={char.bonusStats[getStatIndex(index)]}
                        index={1}
                    />
                ),
                values: values[
                    `bonusStat${node}` as UpdateCostsPayload["type"]
                ],
            })),
        ],
        [
            {
                icon: `characters/skills/${name}_passive1`,
                type: "passive1",
                title: "Inherent Skill 1",
                values: values.passive1,
            },
            ...[1, 3, 5, 7].map((node, index) => ({
                icon: `stat_icons/${char.bonusStats[getStatIndex(index)]}`,
                type: `bonusStat${node}` as UpdateCostsPayload["type"],
                title: (
                    <TooltipText
                        bonusStat={char.bonusStats[getStatIndex(index)]}
                        index={0}
                    />
                ),
                values: values[
                    `bonusStat${node}` as UpdateCostsPayload["type"]
                ],
            })),
        ],
    ];

    const [Level, Attack, Skill, Ultimate, Circuit, Intro] = sliders.map(
        (slider) => (
            <LevelSlider
                key={slider.type}
                mode={mode}
                name={character.name}
                variant="character"
                title={slider.title}
                icon={slider.icon}
                levels={slider.levels}
                values={slider.values}
                color={getElementColor(theme, character.element)}
                type={slider.type}
            />
        )
    );

    function TooltipText(props: { bonusStat: BonusStat; index: 0 | 1 }) {
        const { bonusStat, index } = props;
        const element = bonusStat.split(" ")[0] as Element;
        return (
            <>
                <span
                    style={{
                        color: elements.includes(element)
                            ? getElementColor(theme, element)
                            : "",
                    }}
                >
                    {bonusStat}
                </span>
                {` +${characterBonusStats[bonusStat][index]}`}
            </>
        );
    }

    return (
        <Stack spacing={2} divider={<Divider />}>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={mode === "view" ? 2 : 6}
            >
                <Grid size={12}>{Level}</Grid>
                {[Attack, Skill, Ultimate, Circuit, Intro].map(
                    (slider, index) => (
                        <Grid
                            key={index}
                            size={
                                mode === "view"
                                    ? { xs: 6, sm: "grow", lg: 4 }
                                    : { xs: 12, md: 6 }
                            }
                        >
                            {slider}
                        </Grid>
                    )
                )}
            </Grid>
            <Stack spacing={2}>
                {nodes.map((nodeGroup, index) => {
                    [nodeGroup[0], nodeGroup[2]] = [nodeGroup[2], nodeGroup[0]];
                    return (
                        <FlexBox
                            key={index}
                            sx={{
                                px: "8px",
                                gap: "16px",
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            {nodeGroup.map((node) => (
                                <StatNode
                                    key={node.type}
                                    mode={mode}
                                    node={Math.abs(index - 2)}
                                    name={character.name}
                                    title={node.title}
                                    icon={node.icon}
                                    type={node.type}
                                    values={values[node.type]}
                                />
                            ))}
                        </FlexBox>
                    );
                })}
            </Stack>
        </Stack>
    );
}

export default CharacterSliders;

const charLevel = [
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

const skillLevel = range(1, 10);

function getStatIndex(index: number) {
    return index === 0 || index === 3 ? 1 : 0;
}
