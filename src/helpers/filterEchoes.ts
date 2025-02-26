import { Echo } from "../types/echo";
import { EchoFilterState } from "reducers/echoFilters";
import { BrowserSettings } from "reducers/browser";
import { echoes as echoData } from "data/common";

export const filterEchoes = (
    echoes: Echo[],
    filters: EchoFilterState,
    searchValue: string,
    sortSettings: BrowserSettings
) => {
    let echos = [...echoes];
    if (filters.class.length > 0) {
        echos = echos.filter((echo) => filters.class.includes(echo.class));
    }
    if (filters.sonata.length > 0) {
        if (filters.uniqueSonata) {
            echos = echos.filter((echo) =>
                filters.sonata.every((f) => echo.sonata.includes(f))
            );
        } else {
            echos = echos.filter((echo) =>
                filters.sonata.some((f) => echo.sonata.includes(f))
            );
        }
    }
    if (searchValue !== "") {
        echos = echos.filter(
            (echo) =>
                echo.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                echo.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    }

    switch (sortSettings.sortBy) {
        case "name":
            echos = echos.sort((a, b) =>
                a.displayName.localeCompare(b.displayName)
            );
            break;
        case "rarity":
            echos = echos.sort(
                (a, b) =>
                    echoData[b.class].rarity - echoData[a.class].rarity ||
                    a.displayName.localeCompare(b.displayName)
            );
            break;
        case "release":
            echos = echos.sort(
                (a, b) =>
                    b.id - a.id || a.displayName.localeCompare(b.displayName)
            );
            break;
        case "element":
        case "weapon":
            break;
    }

    if (sortSettings.sortDirection === "desc") {
        echos = echos.reverse();
    }

    return echos;
};
