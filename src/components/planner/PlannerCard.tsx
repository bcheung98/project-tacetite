import React from "react";

// Component imports
import CharacterSliders from "./CharacterSliders";
import WeaponSliders from "./WeaponSliders";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import MaterialImage from "custom/MaterialImage";
import RouterLink from "components/nav/RouterLink";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import {
    useTheme,
    Divider,
    IconButton,
    Stack,
    Button,
    Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    getSelectedCharacters,
    getSelectedWeapons,
    setPlannerCharacters,
    setPlannerWeapons,
} from "reducers/planner";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";
import {
    createMaterialCostData,
    reduceMaterialCosts,
} from "helpers/createMaterialCostData";

// Type imports
import {
    CharacterCostObject,
    TotalCostObject,
    WeaponCost,
    WeaponCostObject,
} from "types/costs";
import { Element, WeaponType } from "types/_common";

export type CardMode = "view" | "edit";

interface PlannerCardProps {
    data: CharacterCostObject | WeaponCostObject;
}

function PlannerCard({ data }: PlannerCardProps) {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const characters = useAppSelector(getSelectedCharacters);
    const weapons = useAppSelector(getSelectedWeapons);

    const [mode, setMode] = React.useState<CardMode>("view");
    const handleModeChange = () => {
        if (mode === "view") {
            setMode("edit");
        } else {
            setMode("view");
        }
    };

    const { name, rarity } = data;

    let variant: "character" | "weapon";
    let title: string,
        element: Element | undefined,
        weaponType: WeaponType,
        imgSrc: string,
        route: "resonators" | "weapons",
        costs: TotalCostObject | WeaponCost;

    if ("element" in data) {
        variant = "character";
        title = data.fullName;
        element = data.element;
        weaponType = data.weapon;
        imgSrc = `characters/icons/${name}`;
        route = "resonators";
        costs = reduceMaterialCosts(data.costs);
    } else {
        variant = "weapon";
        title = data.displayName;
        weaponType = data.type;
        imgSrc = `weapons/${name}`;
        route = "weapons";
        costs = data.costs;
    }

    const handleDelete = () => {
        if (variant === "character") {
            const newValues = characters.filter((char) => char.name !== name);
            dispatch(setPlannerCharacters(newValues));
        } else {
            const newValues = weapons.filter((wep) => wep.name !== name);
            dispatch(setPlannerWeapons(newValues));
        }
    };

    return (
        <MainContentBox
            title={
                <FlexBox>
                    <RouterLink
                        to={`/${route}/${name
                            .split(" ")
                            .join("_")
                            .toLowerCase()}`}
                    >
                        <Image
                            src={imgSrc}
                            alt={name}
                            style={{
                                width: "56px",
                                border: `2px solid ${getRarityColor(rarity)}`,
                                borderRadius: "8px",
                                marginRight: "16px",
                                backgroundColor: theme.background(1),
                                backgroundImage: `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${rarity}_Star.png)`,
                                backgroundSize: "contain",
                                boxShadow:
                                    variant === "character"
                                        ? "none"
                                        : `inset 0 0 28px 4px ${getBackgroundColor(
                                              rarity
                                          )}`,
                            }}
                        />
                    </RouterLink>
                    <Stack spacing={0.25} sx={{ minHeight: "56px" }}>
                        <RouterLink
                            to={`/${route}/${name
                                .split(" ")
                                .join("_")
                                .toLowerCase()}`}
                        >
                            <TextStyled
                                variant="h6-styled"
                                sx={{
                                    cursor: "pointer",
                                    color: "white",
                                    "&:hover": {
                                        color: theme.text.selected,
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                {title}
                            </TextStyled>
                        </RouterLink>
                        <Stack direction="row" spacing={0.5}>
                            {element && (
                                <Image
                                    src={`elements/${element}`}
                                    alt={element}
                                    style={{ width: "20px" }}
                                    tooltip={element}
                                />
                            )}
                            <Image
                                src={`weapons/icons/${weaponType}`}
                                alt={weaponType}
                                style={{ width: "20px" }}
                                tooltip={weaponType}
                            />
                        </Stack>
                    </Stack>
                </FlexBox>
            }
            actions={
                <IconButton onClick={handleDelete} sx={{ color: "white" }}>
                    <StyledTooltip title="Delete" arrow placement="top">
                        <DeleteIcon />
                    </StyledTooltip>
                </IconButton>
            }
            contentProps={{ padding: "16px 24px" }}
        >
            <TextStyled>Materials Required</TextStyled>
            <Grid container spacing={2} sx={{ mt: "16px" }}>
                {createMaterialCostData(costs as TotalCostObject).map(
                    (material, index) => (
                        <MaterialImage
                            key={index}
                            name={material.name}
                            rarity={material.rarity}
                            cost={material.cost}
                            imgSrc={material.img}
                            size="64px"
                        />
                    )
                )}
            </Grid>
            <Divider sx={{ my: "16px" }} />
            <Button
                onClick={handleModeChange}
                variant="contained"
                color="primary"
                disableRipple
                startIcon={mode !== "edit" ? <EditIcon /> : <DoneIcon />}
                sx={{ mb: "16px" }}
            >
                {mode !== "edit" ? "Edit" : "Done"}
            </Button>
            <Box sx={{ mx: { xs: "0px", lg: "8px" } }}>
                {"element" in data ? (
                    <CharacterSliders character={data} mode={mode} />
                ) : (
                    <WeaponSliders weapon={data} mode={mode} />
                )}
            </Box>
        </MainContentBox>
    );
}

export default PlannerCard;
