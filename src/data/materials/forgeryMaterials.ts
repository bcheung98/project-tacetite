import { ForgeryMaterialKeys } from "types/materials";

export const forgeryMaterials = {
    "Metallic Drip": {
        "Metallic Drip1": "Inert Metallic Drip",
        "Metallic Drip2": "Reactive Metallic Drip",
        "Metallic Drip3": "Polarized Metallic Drip",
        "Metallic Drip4": "Heterized Metallic Drip",
    },
    Waveworn: {
        Waveworn1: "Waveworn Residue 210",
        Waveworn2: "Waveworn Residue 226",
        Waveworn3: "Waveworn Residue 235",
        Waveworn4: "Waveworn Residue 239",
    },
    Cadence: {
        Cadence1: "Cadence Seed",
        Cadence2: "Cadence Bud",
        Cadence3: "Cadence Leaf",
        Cadence4: "Cadence Blossom",
    },
    Phlogiston: {
        Phlogiston1: "Impure Phlogiston",
        Phlogiston2: "Extracted Phlogiston",
        Phlogiston3: "Refined Phlogiston",
        Phlogiston4: "Flawless Phlogiston",
    },
    Helix: {
        Helix1: "Lento Helix",
        Helix2: "Adagio Helix",
        Helix3: "Adante Helix",
        Helix4: "Presto Helix",
    },
};

export const formatForgeryMaterials = (
    material: ForgeryMaterialKeys
): string => {
    const mat = forgeryMaterials[material];
    return mat[`${material}0` as keyof typeof mat] || material;
};
