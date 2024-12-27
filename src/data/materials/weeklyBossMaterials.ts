import { objectKeys } from "helpers/utils";
import { WeeklyBossMaterial } from "types/materials";

export const weeklyBossMaterials = <const>{
    "Dreamless Feather": {
        displayName: "Dreamless Feather",
        source: "Dreamless",
    },
    "Monument Bell": {
        displayName: "Monument Bell",
        source: "Bell-Borne Geochelone",
    },
    "Unending Destruction": {
        displayName: "Unending Destruction",
        source: "Scar",
    },
    "Sentinel's Dagger": {
        displayName: "Sentinel's Dagger",
        source: "Jué",
    },
};

export const weeklyBossMatNames = objectKeys(weeklyBossMaterials);

export const formatWeeklyBossMaterials = (material: WeeklyBossMaterial) => {
    const mat = weeklyBossMaterials[material] || {
        displayName: "",
        source: "?",
    };
    return `${mat.displayName} (${mat.source})`;
};
