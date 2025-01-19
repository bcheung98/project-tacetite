import { BaseSyntheticEvent } from "react";

// Component imports
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";
import RarityStars from "custom/RarityStars";

// MUI imports
import { useTheme, List, IconButton, Toolbar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { objectKeys } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    activeWeaponFilters,
    clearFilters,
    selectWeaponFilters,
    setCommonMat,
    setForgeryMat,
    setRarity,
    setSubstats,
    setWeaponType,
} from "reducers/weaponFilters";
import { rarities, weapons } from "data/common";
import { WeaponSubStat, weaponSubStats } from "data/weaponStats";
import {
    forgeryMaterials,
    formatForgeryMaterials,
} from "data/materials/forgeryMaterials";
import {
    commonMaterials,
    formatCommonMaterials,
} from "data/materials/commonMaterials";

// Type imports
import { Rarity, WeaponType } from "types/_common";
import { CommonMaterialKeys, ForgeryMaterialKeys } from "types/materials";

function WeaponFilters({ handleClose }: { handleClose: (arg0: any) => void }) {
    const theme = useTheme();

    const filters = useAppSelector(selectWeaponFilters);
    const dispatch = useAppDispatch();

    const filterGroups = [
        {
            name: "Weapon",
            value: filters.weaponType,
            onChange: (_: BaseSyntheticEvent, newValues: WeaponType[]) =>
                dispatch(setWeaponType(newValues)),
            buttons: createButtons<WeaponType>(weapons, "weapons/icons"),
        },
        {
            name: "Rarity",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                dispatch(setRarity(newValues)),
            buttons: rarities.map((rarity) => ({
                value: rarity,
                label: <RarityStars rarity={rarity} variant="h6-styled" />,
            })),
        },
        {
            name: "Substat",
            value: filters.substats,
            onChange: (_: BaseSyntheticEvent, newValues: WeaponSubStat[]) =>
                dispatch(setSubstats(newValues)),
            buttons: createButtons(weaponSubStats, "stat_icons"),
        },
        {
            name: "Forgery Material",
            value: filters.forgeryMat,
            onChange: (
                _: BaseSyntheticEvent,
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
                _: BaseSyntheticEvent,
                newValues: CommonMaterialKeys[]
            ) => dispatch(setCommonMat(newValues)),
            buttons: createButtons<CommonMaterialKeys>(
                objectKeys(commonMaterials),
                "materials/common"
            ),
        },
    ];

    return (
        <>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                    onClick={() => dispatch(clearFilters())}
                    disabled={!useAppSelector(activeWeaponFilters)}
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
                            padding={"label" in filter.buttons[0] ? "0 8px" : 0}
                        />
                    </Dropdown>
                ))}
            </List>
        </>
    );
}

export default WeaponFilters;

function createButtons<T>(items: readonly T[], url: string) {
    const padding = url.startsWith("materials/") ? "0px" : "4px";
    return items.map((item) => ({
        value: item,
        icon: (
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
    if (url.startsWith("materials/common")) {
        tooltip = formatCommonMaterials(item as CommonMaterialKeys);
    } else if (url.startsWith("materials/forgery")) {
        tooltip = formatForgeryMaterials(item as ForgeryMaterialKeys);
    } else {
        tooltip = `${item}`;
    }
    return tooltip;
}
