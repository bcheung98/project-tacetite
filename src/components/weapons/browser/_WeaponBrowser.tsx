import React from "react";

// Component imports
import WeaponFilters from "./WeaponFilters";
import WeaponTable from "./WeaponTable";
import InfoCard from "custom/InfoCard";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import SearchBar from "custom/SearchBar";
import ActionFab from "custom/ActionFab";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Button, Drawer } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import TableRowsIcon from "@mui/icons-material/TableRows";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { filterWeapons } from "helpers/filterWeapons";
import { selectWeapons } from "reducers/weapon";
import { clearFilters, selectWeaponFilters } from "reducers/weaponFilters";
import { isRightDrawerOpen, toggleRightDrawer } from "reducers/layout";

function WeaponBrowser() {
    const documentTitle = `Weapons ${import.meta.env.VITE_DOCUMENT_TITLE}`;
    const documentDesc = `A list of all Wuthering Waves Weapons`;
    document.title = documentTitle;
    document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", documentTitle);
    document
        .querySelector('meta[property="description"]')
        ?.setAttribute("content", documentDesc);
    document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", documentDesc);

    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const weapons = [...useAppSelector(selectWeapons)].sort(
        (a, b) =>
            b.rarity - a.rarity || a.displayName.localeCompare(b.displayName)
    );
    const filters = useAppSelector(selectWeaponFilters);

    const [searchValue, setSearchValue] = React.useState("");
    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentWeapons = React.useMemo(
        () => filterWeapons(weapons, filters, searchValue),
        [weapons, filters, searchValue]
    );

    const drawerOpen = useAppSelector(isRightDrawerOpen);
    const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
    const toggleDrawerState = () => {
        dispatch(toggleRightDrawer());
    };
    const handleMobileDrawerOpen = () => {
        setMobileDrawerOpen(true);
    };
    const handleMobileDrawerClose = () => {
        setMobileDrawerOpen(false);
    };

    type View = "card" | "table";
    const [view, setView] = React.useState<View>("card");
    const handleView = (_: React.BaseSyntheticEvent, newView: View) => {
        if (newView !== null) {
            setView(newView);
        }
    };
    const buttons: CustomToggleButtonProps[] = [
        {
            value: "card",
            icon: <ViewCompactIcon />,
        },
        {
            value: "table",
            icon: <TableRowsIcon />,
        },
    ];

    React.useEffect(() => {
        dispatch(clearFilters());
    }, []);

    React.useEffect(() => {
        dispatch(toggleRightDrawer(matches_md_up));
    }, [matches_md_up]);

    return (
        <>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={3}
                sx={{ mb: "20px" }}
            >
                <Grid size="auto">
                    <TextStyled variant="h5-styled" sx={{ lineHeight: "36px" }}>
                        Weapons
                    </TextStyled>
                </Grid>
                <Grid size={{ xs: 6, sm: "auto" }}>
                    <ToggleButtons
                        color="primary"
                        buttons={buttons}
                        value={view}
                        exclusive
                        onChange={handleView}
                        highlightOnHover={false}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <SearchBar
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        size={{ height: "36px" }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <Button
                        onClick={
                            matches_md_up
                                ? toggleDrawerState
                                : handleMobileDrawerOpen
                        }
                        variant="contained"
                        color="primary"
                        disableElevation
                        disableRipple
                        startIcon={
                            matches_md_up && drawerOpen ? (
                                <KeyboardArrowRightIcon />
                            ) : (
                                <TuneIcon />
                            )
                        }
                        sx={{ height: "36px" }}
                    >
                        Filters
                    </Button>
                </Grid>
            </Grid>
            {view === "card" && (
                <Grid container spacing={3}>
                    {currentWeapons.map((weapon) => (
                        <InfoCard
                            key={weapon.id}
                            id={`${weapon.name}-weaponBrowser`}
                            name={weapon.name}
                            displayName={weapon.displayName}
                            type="weapon"
                            rarity={weapon.rarity}
                            info={{ weaponType: weapon.type }}
                        />
                    ))}
                </Grid>
            )}
            {view === "table" && <WeaponTable weapons={currentWeapons} />}
            <ActionFab
                action={
                    matches_md_up ? toggleDrawerState : handleMobileDrawerOpen
                }
                icon={<TuneIcon />}
                tooltip="Open filters"
                tooltipArrow="left"
            />
            {!matches_md_up && (
                <Drawer
                    sx={theme.styles.drawer(matches_sm_up)}
                    variant="temporary"
                    anchor={matches_sm_up ? "right" : "bottom"}
                    open={mobileDrawerOpen}
                    onClose={handleMobileDrawerClose}
                >
                    <WeaponFilters handleClose={handleMobileDrawerClose} />
                </Drawer>
            )}
        </>
    );
}

export default WeaponBrowser;
