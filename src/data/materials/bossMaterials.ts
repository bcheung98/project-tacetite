import { objectKeys } from "helpers/utils";
import { BossMaterial } from "types/materials";

export const bossMaterials = <const>{
    "Mysterious Code": {
        displayName: "Mysterious Code",
        source: "",
    },
    "Elegy Tacet Core": {
        displayName: "Elegy Tacet Core",
        source: "Mourning Aix",
    },
    "Gold-Dissolving Feather": {
        displayName: "Gold-Dissolving Feather",
        source: "Impermanence Heron",
    },
    "Group Abomination Tacet Core": {
        displayName: "Group Abomination Tacet Core",
        source: "Mech Abomination",
    },
    "Hidden Thunder Tacet Core": {
        displayName: "Hidden Thunder Tacet Core",
        source: "Tempest Mephis",
    },
    "Rage Tacet Core": {
        displayName: "Rage Tacet Core",
        source: "Inferno Rider",
    },
    "Roaring Rock Fist": {
        displayName: "Roaring Rock Fist",
        source: "Feilian Beringal",
    },
    "Sound-Keeping Tacet Core": {
        displayName: "Sound-Keeping Tacet Core",
        source: "Lampylumen Myriad",
    },
    "Strife Tacet Core": {
        displayName: "Strife Tacet Core",
        source: "Crownless",
    },
    "Thundering Tacet Core": {
        displayName: "Thundering Tacet Core",
        source: "Thundering Mephis",
    },
    "Topological Confinement": {
        displayName: "Topological Confinement",
        source: "Fallacy of No Return",
    },
};

export const bossMatNames = objectKeys(bossMaterials);

export const formatBossMaterials = (material: BossMaterial) => {
    const mat = bossMaterials[material] || { displayName: "", source: "?" };
    return `${mat.displayName} (${mat.source})`;
};
