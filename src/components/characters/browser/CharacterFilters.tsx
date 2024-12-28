import React from "react";

// Component imports
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";

// MUI imports
import { useTheme, List, IconButton, Toolbar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { objectKeys } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    activeCharacterFilters,
    clearFilters,
    selectCharacterFilters,
    setAscensionMat,
    setBossMat,
    setCommonMat,
    setElement,
    setForgeryMat,
    setRarity,
    setRoles,
    setWeapon,
    setWeeklyBossMat,
} from "reducers/characterFilters";
import { elements, weapons } from "data/common";
import { combatRoles } from "data/combatRoles";
import { forgeryMaterials } from "data/materials/forgeryMaterials";
import { commonMaterials } from "data/materials/commonMaterials";
import { ascensionMaterials } from "data/materials/ascensionMaterials";
import {
    bossMatNames,
    formatBossMaterials,
} from "data/materials/bossMaterials";
import {
    formatWeeklyBossMaterials,
    weeklyBossMatNames,
} from "data/materials/weeklyBossMaterials";

// Type imports
import { Element, Rarity, WeaponType } from "types/_common";
import {
    AscensionMaterial,
    BossMaterial,
    CommonMaterialKeys,
    ForgeryMaterialKeys,
    WeeklyBossMaterial,
} from "types/materials";

import { CombatRole } from "types/character";

function CharacterFilters({
    handleClose,
}: {
    handleClose: (arg0: any) => void;
}) {
    const theme = useTheme();

    const filters = useAppSelector(selectCharacterFilters);
    const dispatch = useAppDispatch();

    const filterGroups = [
        {
            name: "Attribute",
            value: filters.element,
            onChange: (_: React.BaseSyntheticEvent, newValues: Element[]) =>
                dispatch(setElement(newValues)),
            buttons: createButtons<Element>(elements, "elements/icons"),
        },
        {
            name: "Weapon",
            value: filters.weapon,
            onChange: (_: React.BaseSyntheticEvent, newValues: WeaponType[]) =>
                dispatch(setWeapon(newValues)),
            buttons: createButtons<WeaponType>(weapons, "weapons/icons"),
        },
        {
            name: "Rarity",
            value: filters.rarity,
            onChange: (_: React.BaseSyntheticEvent, newValues: Rarity[]) =>
                dispatch(setRarity(newValues)),
            buttons: createButtons<Rarity>([5, 4], "stars/"),
        },
        {
            name: "Combat Roles",
            value: filters.roles,
            onChange: (_: React.BaseSyntheticEvent, newValues: CombatRole[]) =>
                dispatch(setRoles(newValues)),
            buttons: createButtons<CombatRole>(
                objectKeys(combatRoles),
                "materials/forgery"
            ),
        },
        {
            name: "Forgery Material",
            value: filters.forgeryMat,
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: ForgeryMaterialKeys[]
            ) => dispatch(setForgeryMat(newValues)),
            buttons: createButtons<ForgeryMaterialKeys>(
                objectKeys(forgeryMaterials),
                "materials/forgery"
            ),
        },
        {
            name: "Common Material",
            value: filters.commonMat,
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: CommonMaterialKeys[]
            ) => dispatch(setCommonMat(newValues)),
            buttons: createButtons<CommonMaterialKeys>(
                objectKeys(commonMaterials),
                "materials/common"
            ),
        },
        {
            name: "Ascension Material",
            value: filters.forgeryMat,
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: AscensionMaterial[]
            ) => dispatch(setAscensionMat(newValues)),
            buttons: createButtons<AscensionMaterial>(
                ascensionMaterials,
                "materials/forgery"
            ),
        },
        {
            name: "Boss Material",
            value: filters.bossMat,
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: BossMaterial[]
            ) => dispatch(setBossMat(newValues)),
            buttons: createButtons<BossMaterial>(
                bossMatNames,
                "materials/boss"
            ),
        },
        {
            name: "Weekly Boss Material",
            value: filters.weeklyBossMat,
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: WeeklyBossMaterial[]
            ) => dispatch(setWeeklyBossMat(newValues)),
            buttons: createButtons<WeeklyBossMaterial>(
                weeklyBossMatNames,
                "materials/weekly"
            ),
        },
    ];

    return (
        <>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                    onClick={() => dispatch(clearFilters())}
                    disabled={!useAppSelector(activeCharacterFilters)}
                    variant="contained"
                    color="secondary"
                    disableElevation
                    startIcon={<RestartAltIcon />}
                    sx={{
                        height: "32px",
                        "&.Mui-disabled": {
                            opacity: 0.35,
                            color: theme.appbar.color,
                        },
                    }}
                >
                    Reset
                </Button>

                <IconButton
                    onClick={handleClose}
                    sx={{ color: theme.appbar.color }}
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <List sx={{ px: "16px" }}>
                {filterGroups.map((filter, index) => (
                    <Dropdown
                        key={index}
                        title={filter.name}
                        titleColor={
                            filter.value.length > 0
                                ? theme.text.selected
                                : theme.appbar.color
                        }
                        contentPadding="4px 0px 4px 24px"
                    >
                        <ToggleButtons
                            color="secondary"
                            buttons={filter.buttons}
                            value={filter.value}
                            onChange={filter.onChange}
                            spacing={4}
                            padding={0}
                        />
                    </Dropdown>
                ))}
            </List>
        </>
    );
}

export default CharacterFilters;

function createButtons<T>(items: readonly T[], url: string) {
    const padding = url.startsWith("materials/") ? "0px" : "4px";
    return items.map((item) => ({
        value: item,
        icon: (
            <Image
                src={`${url}/${item}`}
                alt={`${item}`}
                style={{ width: "32px", padding: padding, borderRadius: "4px" }}
                tooltip={getTooltip(item, url)}
            />
        ),
    }));
}

function getTooltip<T>(item: T, url: string) {
    let tooltip;
    if (url.startsWith("materials/boss")) {
        tooltip = `${formatBossMaterials(item as BossMaterial)}`;
    } else if (url.startsWith("materials/weekly")) {
        tooltip = `${formatWeeklyBossMaterials(item as WeeklyBossMaterial)}`;
    } else if (url.startsWith("ranks")) {
        tooltip = "";
    } else {
        tooltip = `${item}`;
    }
    return tooltip;
}
