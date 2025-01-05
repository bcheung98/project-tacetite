import React from "react";

// Component imports
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";
import { StyledSwitch } from "styled/StyledSwitch";
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
    activeEchoFilters,
    clearFilters,
    selectEchoFilters,
    setClass,
    setSonata,
    toggleUniqueSonata,
} from "reducers/echoFilters";
import { echoClasses, echoes } from "data/common";
import { sonataEffects } from "data/sonataEffects";

// Type imports
import { EchoClass, EchoSonata } from "types/echo";

function EchoFilters({ handleClose }: { handleClose: (arg0: any) => void }) {
    const theme = useTheme();

    const filters = useAppSelector(selectEchoFilters);
    const dispatch = useAppDispatch();

    const handleSelect = () => {
        dispatch(toggleUniqueSonata());
    };

    const filterGroups = [
        {
            name: "Echo Class",
            value: filters.class,
            onChange: (_: React.BaseSyntheticEvent, newValues: EchoClass[]) =>
                dispatch(setClass(newValues)),
            buttons: echoClasses.map((echoClass) => ({
                value: echoClass,
                label: (
                    <TextStyled component="span" variant="body1-styled">
                        {`${echoClass} (COST ${echoes[echoClass].cost})`}
                    </TextStyled>
                ),
            })),
        },
        {
            name: "Sonata Effects",
            value: filters.sonata,
            onChange: (_: React.BaseSyntheticEvent, newValues: EchoSonata[]) =>
                dispatch(setSonata(newValues)),
            buttons: objectKeys(sonataEffects).map((sonata) => ({
                value: sonata,
                icon: (
                    <Image
                        src={`echoes/sonata/${sonata}`}
                        alt={sonata}
                        style={{
                            width: "32px",
                            padding: "4px",
                            borderRadius: "4px",
                        }}
                        tooltip={sonata}
                    />
                ),
            })),
            toggle: (
                <FlexBox
                    sx={{ alignItems: "center", flexWrap: "wrap", mb: "8px" }}
                >
                    <StyledSwitch
                        checked={filters.uniqueSonata}
                        onChange={handleSelect}
                        sx={{ mt: "4px" }}
                    />
                    <TextStyled variant="body2-styled">
                        Toggle "AND" Filter
                    </TextStyled>
                    <StyledTooltip
                        title="If toggled, will filter echoes that only include all selected sonata effects."
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
    ];

    return (
        <>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                    onClick={() => dispatch(clearFilters())}
                    disabled={!useAppSelector(activeEchoFilters)}
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

export default EchoFilters;
