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
import { selectWeapons } from "reducers/weapon";
import { getSelectedWeapons, setPlannerWeapons } from "reducers/planner";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";

// Type imports
import { Weapon } from "types/weapon";
import { WeaponCostObject } from "types/costs";
import { CommonMaterial, ForgeryMaterial } from "types/materials";

function WeaponSelector() {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const weapons = [...useAppSelector(selectWeapons)].sort(
        (a, b) =>
            b.rarity - a.rarity || a.displayName.localeCompare(b.displayName)
    );
    const options = useMemo(
        () => createOptions(weapons),
        [JSON.stringify(weapons)]
    );
    const values = useAppSelector(getSelectedWeapons);

    const smallIconStyle = { width: "16px", height: "16px" };

    return (
        <Autocomplete
            multiple
            autoComplete
            filterSelectedOptions
            disableClearable
            options={options}
            getOptionLabel={(option) => option.displayName}
            filterOptions={(options, { inputValue }) =>
                options.filter(
                    (option) =>
                        option.name
                            .toLocaleLowerCase()
                            .includes(inputValue.toLocaleLowerCase()) ||
                        option.displayName
                            .toLocaleLowerCase()
                            .includes(inputValue.toLocaleLowerCase())
                )
            }
            noOptionsText="No Weapons"
            value={values}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            onChange={(event, newValue: WeaponCostObject[] | null, reason) => {
                if (
                    event.type === "keydown" &&
                    ((event as React.KeyboardEvent).key === "Backspace" ||
                        (event as React.KeyboardEvent).key === "Delete") &&
                    reason === "removeOption"
                ) {
                    return;
                }
                dispatch(setPlannerWeapons(newValue as WeaponCostObject[]));
            }}
            renderTags={() => null}
            renderInput={(params) => (
                <SearchBar
                    params={params}
                    placeholder="Weapons"
                    inputIcon={
                        <Image
                            src="icons/Weapon"
                            alt="Weapons"
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
                    key={option.displayName}
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
                                src={`weapons/icons/${option.type}`}
                                alt={option.type}
                                style={smallIconStyle}
                                tooltip={option.type}
                            />
                        </Stack>
                        <Image
                            src={`weapons/${option.name}`}
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
                        <TextStyled noWrap>{option.displayName}</TextStyled>
                    </Stack>
                </StyledMenuItem>
            )}
        />
    );
}

export default WeaponSelector;

function createOptions(weapons: Weapon[]) {
    return weapons.map(
        (wep) =>
            ({
                id: `weapon_${wep.id}`,
                name: wep.name,
                displayName: wep.displayName,
                rarity: wep.rarity,
                type: wep.type,
                release: wep.release,
                costs: {
                    credits: {
                        Credit: 0,
                    },
                    weaponXP: {
                        WeaponXP1: 0,
                        WeaponXP2: 0,
                        WeaponXP3: 0,
                        WeaponXP4: 0,
                    },
                    forgeryMat: {
                        [`${wep.materials.forgeryMat}1` as ForgeryMaterial]: 0,
                        [`${wep.materials.forgeryMat}2` as ForgeryMaterial]: 0,
                        [`${wep.materials.forgeryMat}3` as ForgeryMaterial]: 0,
                        [`${wep.materials.forgeryMat}4` as ForgeryMaterial]: 0,
                    },
                    commonMat: {
                        [`${wep.materials.commonMat}1` as CommonMaterial]: 0,
                        [`${wep.materials.commonMat}2` as CommonMaterial]: 0,
                        [`${wep.materials.commonMat}3` as CommonMaterial]: 0,
                        [`${wep.materials.commonMat}4` as CommonMaterial]: 0,
                    },
                },
                values: {
                    level: {},
                },
            } as WeaponCostObject)
    );
}
