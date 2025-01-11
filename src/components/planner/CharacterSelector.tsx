import { useMemo } from "react";

// Component imports
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import { StyledMenuItem } from "styled/StyledMenu";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Autocomplete, Stack } from "@mui/material";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { getSelectedCharacters, setPlannerCharacters } from "reducers/planner";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";

// Type imports
import { Character } from "types/character";
import { CharacterCostObject } from "types/costs";
import {
    AscensionMaterial,
    BossMaterial,
    CommonMaterial,
    ForgeryMaterial,
    WeeklyBossMaterial,
} from "types/materials";

function CharacterSelector() {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const characters = [...useAppSelector(selectCharacters)].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
    );
    const options = useMemo(
        () => createOptions(characters),
        [JSON.stringify(characters)]
    );
    const values = useAppSelector(getSelectedCharacters);

    const smallIconStyle = { width: "16px", height: "16px" };

    return (
        <Autocomplete
            multiple
            autoComplete
            filterSelectedOptions
            options={options}
            getOptionLabel={(option) => option.fullName}
            filterOptions={(options, { inputValue }) =>
                options.filter(
                    (option) =>
                        option.name
                            .toLocaleLowerCase()
                            .includes(inputValue.toLocaleLowerCase()) ||
                        option.fullName
                            .toLocaleLowerCase()
                            .includes(inputValue.toLocaleLowerCase())
                )
            }
            noOptionsText="No Resonators"
            value={values}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            onChange={(_: any, newValue: CharacterCostObject[] | null) =>
                dispatch(
                    setPlannerCharacters(newValue as CharacterCostObject[])
                )
            }
            renderInput={(params) => (
                <SearchBar
                    params={params}
                    placeholder="Resonators"
                    inputIcon={
                        <Image
                            src="icons/Character"
                            alt="Resonators"
                            style={{
                                width: "32px",
                                marginLeft: "4px",
                                backgroundColor: theme.appbar.backgroundColor,
                                borderRadius: "64px",
                            }}
                        />
                    }
                />
            )}
            renderOption={(props, option) => (
                <StyledMenuItem
                    {...props}
                    key={option.fullName}
                    sx={{
                        "&:hover": {
                            backgroundColor: theme.menu.selectedHover,
                        },
                        "&:not(:last-child)": {
                            borderBottom: `1px solid ${theme.border.color.primary}`,
                        },
                    }}
                >
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Stack
                            spacing={1}
                            sx={{
                                p: "4px",
                                borderRadius: "16px",
                                backgroundColor: theme.appbar.backgroundColor,
                            }}
                        >
                            <Image
                                src={`elements/${option.element}`}
                                alt={option.element}
                                style={smallIconStyle}
                                tooltip={option.element}
                            />
                            <Image
                                src={`weapons/icons/${option.weapon}`}
                                alt={option.weapon}
                                style={smallIconStyle}
                                tooltip={option.weapon}
                            />
                        </Stack>
                        <Image
                            src={`characters/icons/${option.name}`}
                            alt={option.name}
                            style={{
                                width: "48px",
                                height: "48px",
                                border: `2px solid ${getRarityColor(
                                    option.rarity
                                )}`,
                                borderRadius: theme.mainContentBox.borderRadius,
                                backgroundColor: theme.background(2),
                                boxShadow: `inset 0 0 24px 16px ${getBackgroundColor(
                                    option.rarity
                                )}`,
                            }}
                        />
                        <TextStyled noWrap>{option.fullName}</TextStyled>
                    </Stack>
                </StyledMenuItem>
            )}
        />
    );
}

export default CharacterSelector;

function createOptions(characters: Character[]) {
    return characters.map(
        (char) =>
            ({
                name: char.name,
                fullName: char.fullName,
                rarity: char.rarity,
                element: char.element,
                weapon: char.weapon,
                costs: {
                    // Source of each material is mapped to a specific index in the array:
                    // [Level, Basic Attack, Skill, Ultimate, Forte Circuit, Intro, Passive 1, Passive 2, Bonus Stat 1, Bonus Stat 2, Bonus Stat 3, Bonus Stat 4, Bonus Stat 5, Bonus Stat 6, Bonus Stat 7, Bonus Stat 8]
                    credits: {
                        Credit: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                    characterXP: {
                        CharacterXP1: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                        CharacterXP2: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                        CharacterXP3: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                        CharacterXP4: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                    bossMat: {
                        [`${char.materials.bossMat}` as BossMaterial]: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                    weeklyBossMat: {
                        [`${char.materials.weeklyBossMat}` as WeeklyBossMaterial]:
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    ascensionMat: {
                        [`${char.materials.ascensionMat}` as AscensionMaterial]:
                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    forgeryMat: {
                        [`${char.materials.forgeryMat}1` as ForgeryMaterial]: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                        [`${char.materials.forgeryMat}2` as ForgeryMaterial]: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                        [`${char.materials.forgeryMat}3` as ForgeryMaterial]: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                        [`${char.materials.forgeryMat}4` as ForgeryMaterial]: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                    commonMat: {
                        [`${char.materials.commonMat}1` as CommonMaterial]: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                        [`${char.materials.commonMat}2` as CommonMaterial]: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                        [`${char.materials.commonMat}3` as CommonMaterial]: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                        [`${char.materials.commonMat}4` as CommonMaterial]: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                },
            } as CharacterCostObject)
    );
}
