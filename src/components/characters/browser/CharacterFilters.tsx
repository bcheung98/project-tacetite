import { BaseSyntheticEvent } from "react";

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
import { selectUnreleasedContent } from "reducers/settings";
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
import { formatMaterialName, getMaterialKeyNames } from "helpers/materials";
import {
    forgeryMaterials,
    getForgeryMaterial,
} from "data/materials/forgeryMaterials";
import {
    commonMaterials,
    getCommonMaterial,
} from "data/materials/commonMaterials";
import { ascensionMaterials } from "data/materials/ascensionMaterials";
import { bossMaterials, getBossMaterial } from "data/materials/bossMaterials";
import {
    getWeeklyBossMaterial,
    weeklyBossMaterials,
} from "data/materials/weeklyBossMaterials";

// Type imports
import { Element, Rarity, WeaponType } from "types/_common";
import { CombatRole } from "types/character";
import {
    AscensionMaterial,
    BossMaterial,
    CommonMaterial,
    ForgeryMaterial,
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

    const showUnreleased = useAppSelector(selectUnreleasedContent);

    const handleSelect = () => {
        dispatch(toggleUniqueRoles());
    };

    const filterGroups = [
        {
            name: "Attribute",
            value: filters.element,
            onChange: (_: BaseSyntheticEvent, newValues: Element[]) =>
                dispatch(setElement(newValues)),
            buttons: createButtons(elements, "elements"),
        },
        {
            name: "Weapon",
            value: filters.weapon,
            onChange: (_: BaseSyntheticEvent, newValues: WeaponType[]) =>
                dispatch(setWeapon(newValues)),
            buttons: createButtons(weapons, "weapons/icons"),
        },
        {
            name: "Rarity",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                dispatch(setRarity(newValues)),
            buttons: rarities.slice(0, -3).map((rarity) => ({
                value: rarity,
                label: <RarityStars rarity={rarity} variant="h6-styled" />,
            })),
        },
        {
            name: "Combat Roles",
            value: filters.roles,
            onChange: (_: BaseSyntheticEvent, newValues: CombatRole[]) =>
                dispatch(setRoles(newValues)),
            buttons: createButtons(objectKeys(combatRoles), "tags"),
            toggle: (
                <FlexBox
                    sx={{ alignItems: "center", flexWrap: "wrap", mb: "8px" }}
                >
                    <StyledSwitch
                        checked={filters.uniqueRoles}
                        onChange={handleSelect}
                        sx={{ mt: "4px" }}
                    />
                    <TextStyled
                        variant="body2-styled"
                        sx={{ color: theme.appbar.color }}
                    >
                        Toggle "AND" Filter
                    </TextStyled>
                    <StyledTooltip
                        title="If toggled, will filter resonators that only have all selected combat roles."
                        arrow
                        placement="top"
                    >
                        <IconButton
                            disableRipple
                            sx={{ color: theme.appbar.color }}
                        >
                            <HelpIcon />
                        </IconButton>
                    </StyledTooltip>
                </FlexBox>
            ),
        },
        {
            name: "Forgery Material",
            value: filters.forgeryMat,
            onChange: (_: BaseSyntheticEvent, newValues: ForgeryMaterial[]) =>
                dispatch(setForgeryMat(newValues)),
            buttons: createButtons(
                getMaterialKeyNames([...forgeryMaterials], showUnreleased),
                "materials/forgery"
            ),
        },
        {
            name: "Common Material",
            value: filters.commonMat,
            onChange: (_: BaseSyntheticEvent, newValues: CommonMaterial[]) =>
                dispatch(setCommonMat(newValues)),
            buttons: createButtons(
                getMaterialKeyNames([...commonMaterials], showUnreleased),
                "materials/common"
            ),
        },
        {
            name: "Ascension Material",
            value: filters.ascensionMat,
            onChange: (_: BaseSyntheticEvent, newValues: AscensionMaterial[]) =>
                dispatch(setAscensionMat(newValues)),
            buttons: createButtons(
                getMaterialKeyNames([...ascensionMaterials], showUnreleased),
                "materials/ascension"
            ),
        },
        {
            name: "Boss Material",
            value: filters.bossMat,
            onChange: (_: BaseSyntheticEvent, newValues: BossMaterial[]) =>
                dispatch(setBossMat(newValues)),
            buttons: createButtons(
                getMaterialKeyNames([...bossMaterials], showUnreleased),
                "materials/boss"
            ),
        },
        {
            name: "Weekly Boss Material",
            value: filters.weeklyBossMat,
            onChange: (
                _: BaseSyntheticEvent,
                newValues: WeeklyBossMaterial[]
            ) => dispatch(setWeeklyBossMat(newValues)),
            buttons: createButtons(
                getMaterialKeyNames([...weeklyBossMaterials], showUnreleased),
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

function createButtons<T extends string>(items: readonly T[], url: string) {
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

function getTooltip<T extends string>(item: T, url: string) {
    let tooltip;
    if (url.startsWith("materials/boss")) {
        tooltip = formatMaterialName(getBossMaterial({ tag: item }));
    } else if (url.startsWith("materials/weekly")) {
        tooltip = formatMaterialName(getWeeklyBossMaterial({ tag: item }));
    } else if (url.startsWith("materials/forgery")) {
        tooltip = formatMaterialName(getForgeryMaterial({ tag: item }));
    } else if (url.startsWith("materials/common")) {
        tooltip = formatMaterialName(getCommonMaterial({ tag: item }));
    } else {
        tooltip = `${item}`;
    }
    return tooltip;
}
