import { CommonMaterialKeys } from "types/materials";

export const commonMaterials = {
    "Howler Core": {
        "Howler Core1": "LF Howler Core",
        "Howler Core2": "MF Howler Core",
        "Howler Core3": "HF Howler Core",
        "Howler Core4": "FF Howler Core",
    },
    Mask: {
        Mask0: "Fractsidus Mask",
        Mask1: "Mask of Constraint",
        Mask2: "Mask of Erosion",
        Mask3: "Mask of Distortion",
        Mask4: "Mask of Insanity",
    },
    Ring: {
        Ring0: "Exile Ring",
        Ring1: "Crude Ring",
        Ring2: "Basic Ring",
        Ring3: "Improved Ring",
        Ring4: "Tailored Ring",
    },
    "Whisperin Core": {
        "Whisperin Core1": "LF Whisperin Core",
        "Whisperin Core2": "MF Whisperin Core",
        "Whisperin Core3": "HF Whisperin Core",
        "Whisperin Core4": "FF Whisperin Core",
    },
    "Polygon Core": {
        "Polygon Core1": "LF Polygon Core",
        "Polygon Core2": "MF Polygon Core",
        "Polygon Core3": "HF Polygon Core",
        "Polygon Core4": "FF Polygon Core",
    },
    "Tidal Residuum": {
        "Tidal Residuum1": "LF Tidal Residuum",
        "Tidal Residuum2": "MF Tidal Residuum",
        "Tidal Residuum3": "HF Tidal Residuum",
        "Tidal Residuum4": "FF Tidal Residuum",
    },
};

export const formatCommonMaterials = (material: CommonMaterialKeys): string => {
    const mat = commonMaterials[material];
    return mat[`${material}0` as keyof typeof mat] || material;
};
