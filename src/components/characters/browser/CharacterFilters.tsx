import React from "react";

// Component imports
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";
import RarityStars from "custom/RarityStars";
import { FlexBox } from "styled/StyledBox";
import { StyledSwitch } from "styled/StyledSwitch";
import { TextStyled } from "styled/StyledTypography";
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import { useTheme, List, IconButton, Toolbar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import HelpIcon from "@mui/icons-material/Help";

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
    toggleUniqueRoles,
} from "reducers/characterFilters";
import { elements, rarities, weapons } from "data/common";
import { combatRoles } from "data/combatRoles";
import {
    forgeryMaterials,
    formatForgeryMaterials,
} from "data/materials/forgeryMaterials";
import {
    commonMaterials,
    formatCommonMaterials,
} from "data/materials/commonMaterials";
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
import { CombatRole } from "types/character";
import {
    AscensionMaterial,
    BossMaterial,
    CommonMaterialKeys,
    ForgeryMaterialKeys,
    WeeklyBossMaterial,
} from "types/materials";

function CharacterFilters({
    handleClose,
}: {
    handleClose: (arg0: any) => void;
}) {
    const theme = useTheme();

    const filters = useAppSelector(selectCharacterFilters);
    const dispatch = useAppDispatch();

    const handleSelect = () => {
        dispatch(toggleUniqueRoles());
    };

    const filterGroups = [
        {
            name: "Attribute",
            value: filters.element,
            onChange: (_: React.BaseSyntheticEvent, newValues: Element[]) =>
                dispatch(setElement(newValues)),
            buttons: createButtons<Element>(elements, "elements"),
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
            buttons: rarities.slice(0, -3).map((rarity) => ({
                value: rarity,
                label: <RarityStars rarity={rarity} variant="h6-styled" />,
            })),
        },
        {
            name: "Combat Roles",
            value: filters.roles,
            onChange: (_: React.BaseSyntheticEvent, newValues: CombatRole[]) =>
                dispatch(setRoles(newValues)),
            buttons: createButtons<CombatRole>(objectKeys(combatRoles), "tags"),
            toggle: (
                <FlexBox
                    sx={{ alignItems: "center", flexWrap: "wrap", mb: "8px" }}
                >
                    <StyledSwitch
                        checked={filters.uniqueRoles}
                        onChange={handleSelect}
                        sx={{ mt: "4px" }}
                    />
                    <TextStyled variant="body2-styled">
                        Toggle "AND" Filter
                    </TextStyled>
                    <StyledTooltip
                        title="If toggled, will filter resonators that only contain all selected combat roles."
                        arrow
                        placement="top"
                    >
                        <IconButton disableRipple>
                            <HelpIcon />
                        </IconButton>
                    </StyledTooltip>
                </FlexBox>
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
                "materials/ascension"
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
                bossMatNames.slice(1),
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
                        {"toggle" in filter && filter.toggle}
                        <ToggleButtons
                            color="secondary"
                            buttons={filter.buttons}
                            value={filter.value}
                            onChange={filter.onChange}
                            spacing={4}
                            padding={"label" in filter.buttons[0] ? "0 8px" : 0}
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
        icon: url && (
            <Image
                src={`${url}/${item}${
                    ["materials/forgery", "materials/common"].includes(url)
                        ? "4"
                        : ""
                }`}
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
        tooltip = formatBossMaterials(item as BossMaterial);
    } else if (url.startsWith("materials/weekly")) {
        tooltip = formatWeeklyBossMaterials(item as WeeklyBossMaterial);
    } else if (url.startsWith("materials/common")) {
        tooltip = formatCommonMaterials(item as CommonMaterialKeys);
    } else if (url.startsWith("materials/forgery")) {
        tooltip = formatForgeryMaterials(item as ForgeryMaterialKeys);
    } else {
        tooltip = `${item}`;
    }
    return tooltip;
}
