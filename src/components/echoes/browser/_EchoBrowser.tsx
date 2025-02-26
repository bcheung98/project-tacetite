import { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";

// Component imports
import EchoFilters from "./EchoFilters";
import EchoTable from "./EchoTable";
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
import { echoes as echoData } from "data/common";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { filterEchoes } from "helpers/filterEchoes";
import { selectEchoes } from "reducers/echo";
import { clearFilters, selectEchoFilters } from "reducers/echoFilters";
import { isRightDrawerOpen, toggleRightDrawer } from "reducers/layout";
import { selectBrowserSettings, setBrowserView, View } from "reducers/browser";

function EchoBrowser() {
    const documentTitle = `Echoes ${import.meta.env.VITE_DOCUMENT_TITLE}`;
    const documentDesc = `A list of all Wuthering Waves Echoes`;
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

    const echoes = [...useAppSelector(selectEchoes)];
    const filters = useAppSelector(selectEchoFilters);
    const browserSettings = useAppSelector(selectBrowserSettings).echoes;

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentEchoes = useMemo(
        () => filterEchoes(echoes, filters, searchValue, browserSettings),
        [echoes, filters, searchValue, browserSettings]
    );

    const drawerOpen = useAppSelector(isRightDrawerOpen);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const toggleDrawerState = () => {
        dispatch(toggleRightDrawer());
    };
    const handleMobileDrawerOpen = () => {
        setMobileDrawerOpen(true);
    };
    const handleMobileDrawerClose = () => {
        setMobileDrawerOpen(false);
    };

    const currentView = browserSettings.view;
    const [view, setView] = useState<View>(currentView);
    const handleView = (_: BaseSyntheticEvent, view: View) => {
        if (view !== null) {
            setView(view);
            dispatch(setBrowserView({ type: "echoes", view }));
        }
    };
    const buttons: CustomToggleButtonProps[] = [
        {
            value: "icon",
            icon: <ViewCompactIcon />,
        },
        {
            value: "table",
            icon: <TableRowsIcon />,
        },
    ];

    useEffect(() => {
        dispatch(clearFilters());
    }, []);

    useEffect(() => {
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
                        Echoes
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
            {view === "icon" && (
                <Grid container spacing={3}>
                    {currentEchoes.map((echo, index) => (
                        <InfoCard
                            key={index}
                            id={`${echo.name}-echoBrowser`}
                            name={echo.name}
                            displayName={echo.displayName}
                            type="echo"
                            rarity={echoData[echo.class].rarity}
                            info={{ sonata: echo.sonata }}
                            infoSecondary={{ cost: echo.cost }}
                        />
                    ))}
                </Grid>
            )}
            {view === "table" && <EchoTable echoes={currentEchoes} />}
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
                    <EchoFilters handleClose={handleMobileDrawerClose} />
                </Drawer>
            )}
        </>
    );
}

export default EchoBrowser;
