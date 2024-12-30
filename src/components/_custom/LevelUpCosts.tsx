import React from "react";

// Component imports
import MaterialImage from "custom/MaterialImage";
import LevelUpSliderContainer from "custom/LevelUpSliderContainer";
import { TextStyled } from "styled/StyledTypography";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { range } from "helpers/utils";
import { getElementColor } from "helpers/elementColors";
import {
    getCharacterBonusStatCost,
    getCharacterLevelCost,
    getCharacterPassiveCost,
    getCharacterSkillCost,
    getWeaponLevelCost,
} from "helpers/getLevelUpCosts";
import { createMaterialCostData } from "helpers/createMaterialCostData";

// Type imports
import { Element, Rarity } from "types/_common";
import { TotalCostObject } from "types/costs";
import { CostObjectSourceIndex } from "types/costs";
import {
    BossMaterial,
    AscensionMaterial,
    CommonMaterial,
    Materials,
    ForgeryMaterial,
    WeeklyBossMaterial,
} from "types/materials";

export type LevelUpCostSkillKeys = Exclude<
    keyof typeof CostObjectSourceIndex,
    | "outro"
    | "bonusStat3"
    | "bonusStat4"
    | "bonusStat5"
    | "bonusStat6"
    | "bonusStat7"
    | "bonusStat8"
>;

interface LevelUpCostsProps {
    type: "character" | "weapon";
    skillKey: LevelUpCostSkillKeys;
    name: string;
    rarity?: Rarity;
    element?: Element;
    mats: Materials;
    threshold?: string;
}

function LevelUpCosts({
    type,
    skillKey,
    name,
    rarity = 3,
    element,
    mats,
    threshold = "@100",
}: LevelUpCostsProps) {
    const theme = useTheme();
    const matches_sm_dn = useMediaQuery(theme.breakpoints.down("sm"));

    const levels = getLevels(skillKey, type, rarity);
    const minDistance = 1;
    const maxValue = levels.length;
    const [values, setValues] = React.useState([1, maxValue]);
    const handleSliderChange = (
        _: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxValue - minDistance);
                setValues([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance + 1);
                setValues([clamped - minDistance, clamped]);
            }
        } else {
            setValues(newValue);
        }
    };

    const marks = levels.map((level, index) => ({
        value: index + 1,
        label: (
            <TextStyled
                variant={
                    values.includes(index + 1) ? "body1-styled" : "body2-styled"
                }
                sx={{
                    userSelect: "none",
                    opacity: values.includes(index + 1)
                        ? { "@": 0, [threshold]: 1 }
                        : { "@": 0, [threshold]: 0.25 },
                }}
            >
                {level}
            </TextStyled>
        ),
    }));

    const costs = getCosts({
        type,
        skillKey,
        name,
        rarity,
        values,
        mats,
    });

    return (
        <Box sx={{ containerType: "inline-size" }}>
            <Grid container spacing={2} sx={{ mb: "16px" }}>
                {createMaterialCostData(costs).map((material, index) => (
                    <MaterialImage
                        key={index}
                        name={material.name}
                        rarity={material.rarity}
                        cost={material.cost}
                        imgSrc={material.img}
                        size="64px"
                    />
                ))}
            </Grid>
            {levels.length > 0 && (
                <LevelUpSliderContainer
                    values={[levels[values[0] - 1], levels[values[1] - 1]]}
                    threshold={threshold}
                >
                    <StyledSlider
                        value={values}
                        marks={marks}
                        min={1}
                        max={maxValue}
                        onChange={handleSliderChange}
                        disableSwap
                        size={matches_sm_dn ? "small" : "medium"}
                        sx={{
                            color: getElementColor(theme, element),
                        }}
                    />
                </LevelUpSliderContainer>
            )}
        </Box>
    );
}

export default LevelUpCosts;

function getLevels(
    skillKey: LevelUpCostsProps["skillKey"],
    type: "character" | "weapon",
    rarity: Rarity
) {
    switch (skillKey) {
        case "level":
            if (type === "weapon" && rarity < 3) {
                return ["20", "40", "50", "60", "70"];
            } else {
                return ["20", "40", "50", "60", "70", "80", "90"];
            }
        case "attack":
        case "skill":
        case "ultimate":
        case "circuit":
        case "passive1":
        case "passive2":
        case "intro":
            return range(1, 10);
        default:
            return [];
    }
}

function getCosts({
    type,
    skillKey,
    name,
    rarity,
    values,
    mats,
}: {
    type: "character" | "weapon";
    skillKey: LevelUpCostSkillKeys;
    name: string;
    rarity: Rarity;
    values: number[];
    mats: Materials;
}) {
    let costs, levelUpCost;
    switch (skillKey) {
        case "level":
            if (type === "character") {
                levelUpCost = getCharacterLevelCost(values, true, false, name);
                costs = {
                    credits: {
                        Credit: levelUpCost.credits.Credit,
                    },
                    bossMat: {
                        [`${mats.bossMat}` as BossMaterial]:
                            levelUpCost.bossMat.bossMat,
                    },
                    ascensionMat: {
                        [`${mats.ascensionMat}` as AscensionMaterial]:
                            levelUpCost.ascensionMat.ascensionMat,
                    },
                    commonMat: {
                        [`${mats.commonMat}1` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat1,
                        [`${mats.commonMat}2` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat2,
                        [`${mats.commonMat}3` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat3,
                        [`${mats.commonMat}4` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat4,
                    },
                } as TotalCostObject;
            } else {
                levelUpCost = getWeaponLevelCost(rarity, values, true, false);
                costs = {
                    credits: {
                        Credit: levelUpCost.credits.Credit,
                    },
                    forgeryMat: {
                        [`${mats.forgeryMat}1` as ForgeryMaterial]:
                            levelUpCost.forgeryMat.forgeryMat1,
                        [`${mats.forgeryMat}2` as ForgeryMaterial]:
                            levelUpCost.forgeryMat.forgeryMat2,
                        [`${mats.forgeryMat}3` as ForgeryMaterial]:
                            levelUpCost.forgeryMat.forgeryMat3,
                        [`${mats.forgeryMat}4` as ForgeryMaterial]:
                            levelUpCost.forgeryMat.forgeryMat4,
                    },
                    commonMat: {
                        [`${mats.commonMat}1` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat1,
                        [`${mats.commonMat}2` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat2,
                        [`${mats.commonMat}3` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat3,
                        [`${mats.commonMat}4` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat4,
                    },
                } as TotalCostObject;
            }
            break;
        case "attack":
        case "skill":
        case "ultimate":
        case "circuit":
        case "intro":
            levelUpCost = getCharacterSkillCost(values, true);
            costs = {
                credits: {
                    Credit: levelUpCost.credits.Credit,
                },
                weeklyBossMat: {
                    [`${mats.weeklyBossMat}` as WeeklyBossMaterial]:
                        levelUpCost.weeklyBossMat.weeklyBossMat,
                },
                forgeryMat: {
                    [`${mats.forgeryMat}1` as ForgeryMaterial]:
                        levelUpCost.forgeryMat.forgeryMat1,
                    [`${mats.forgeryMat}2` as ForgeryMaterial]:
                        levelUpCost.forgeryMat.forgeryMat2,
                    [`${mats.forgeryMat}3` as ForgeryMaterial]:
                        levelUpCost.forgeryMat.forgeryMat3,
                    [`${mats.forgeryMat}4` as ForgeryMaterial]:
                        levelUpCost.forgeryMat.forgeryMat4,
                },
                commonMat: {
                    [`${mats.commonMat}1` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat1,
                    [`${mats.commonMat}2` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat2,
                    [`${mats.commonMat}3` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat3,
                    [`${mats.commonMat}4` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat4,
                },
            } as TotalCostObject;
            break;
        case "passive1":
        case "passive2":
            levelUpCost = getCharacterPassiveCost(
                skillKey === "passive1" ? 1 : 2,
                true
            );
            costs = {
                credits: {
                    Credit: levelUpCost.credits.Credit,
                },
                weeklyBossMat: {
                    [`${mats.weeklyBossMat}` as WeeklyBossMaterial]:
                        levelUpCost.weeklyBossMat.weeklyBossMat,
                },
                forgeryMat: {
                    [`${mats.forgeryMat}2` as ForgeryMaterial]:
                        levelUpCost.forgeryMat.forgeryMat2,
                    [`${mats.forgeryMat}3` as ForgeryMaterial]:
                        levelUpCost.forgeryMat.forgeryMat3,
                },
                commonMat: {
                    [`${mats.commonMat}2` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat2,
                    [`${mats.commonMat}3` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat3,
                },
            } as TotalCostObject;
            break;
        case "bonusStat1":
        case "bonusStat2":
            levelUpCost = getCharacterBonusStatCost(
                skillKey === "bonusStat1" ? 1 : 2,
                true
            );
            costs = {
                credits: {
                    Credit: levelUpCost.credits.Credit,
                },
                weeklyBossMat: {
                    [`${mats.weeklyBossMat}` as WeeklyBossMaterial]:
                        levelUpCost.weeklyBossMat.weeklyBossMat,
                },
                forgeryMat: {
                    [`${mats.forgeryMat}3` as ForgeryMaterial]:
                        levelUpCost.forgeryMat.forgeryMat3,
                    [`${mats.forgeryMat}4` as ForgeryMaterial]:
                        levelUpCost.forgeryMat.forgeryMat4,
                },
                commonMat: {
                    [`${mats.commonMat}3` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat3,
                    [`${mats.commonMat}4` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat4,
                },
            } as TotalCostObject;
            break;
    }
    return costs;
}
