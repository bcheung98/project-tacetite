export const formatXPMats = (material: string) => {
    switch (material) {
        case "Character1":
            material = "Basic Resonance Potion"
            break
        case "Character2":
            material = "Medium Resonance Potion"
            break
        case "Character3":
            material = "Advanced Resonance Potion"
            break
        case "Character4":
            material = "Premium Resonance Potion"
            break
        case "Weapon1":
            material = "Basic Energy Core"
            break
        case "Weapon2":
            material = "Medium Energy Core"
            break
        case "Weapon3":
            material = "Advanced Energy Core"
            break
        case "Weapon4":
            material = "Premium Energy Core"
            break
        case "Echo1":
            material = "Basic Sealed Tube"
            break
        case "Echo2":
            material = "Medium Sealed Tube"
            break
        case "Echo3":
            material = "Advanced Sealed Tube"
            break
        case "Echo4":
            material = "Premium Sealed Tube"
            break
        default:
            break
    }
    return material
}

export const formatForgeryMats = (material: string) => {
    switch (material) {
        case "Cadence1":
            material = "Cadence Seed"
            break
        case "Cadence2":
            material = "Cadence Bud"
            break
        case "Cadence3":
            material = "Cadence Leaf"
            break
        case "Cadence4":
            material = "Cadence Blossom"
            break
        case "Helix1":
            material = "Lento Helix"
            break
        case "Helix2":
            material = "Adagio Helix"
            break
        case "Helix3":
            material = "Andante Helix"
            break
        case "Helix4":
            material = "Presto Helix"
            break
        case "Metallic Drip1":
            material = "Inert Metallic Drip"
            break
        case "Metallic Drip2":
            material = "Reactive Metallic Drip"
            break
        case "Metallic Drip3":
            material = "Polarized Metallic Drip"
            break
        case "Metallic Drip4":
            material = "Heterized Metallic Drip"
            break
        case "Phlogiston1":
            material = "Impure Phlogiston"
            break
        case "Phlogiston2":
            material = "Extracted Phlogiston"
            break
        case "Phlogiston3":
            material = "Refined Phlogiston"
            break
        case "Phlogiston4":
            material = "Flawless Phlogiston"
            break
        case "Waveworn1":
            material = "Waveworn Residue 210"
            break
        case "Waveworn2":
            material = "Waveworn Residue 226"
            break
        case "Waveworn3":
            material = "Waveworn Residue 235"
            break
        case "Waveworn4":
            material = "Waveworn Residue 239"
            break
        default:
            break
    }
    return material
}

export const formatCommonMats = (material: string) => {
    switch (material) {
        case "Howler Core1":
            material = "LF Howler Core"
            break
        case "Howler Core2":
            material = "MF Howler Core"
            break
        case "Howler Core3":
            material = "HF Howler Core"
            break
        case "Howler Core4":
            material = "FF Howler Core"
            break
        case "Mask":
            material = "Fractsidus Mask"
            break
        case "Mask1":
            material = "Mask of Constraint"
            break
        case "Mask2":
            material = "Mask of Erosion"
            break
        case "Mask3":
            material = "Mask of Distortion"
            break
        case "Mask4":
            material = "Mask of Insanity"
            break
        case "Ring":
            material = "Exile Ring"
            break
        case "Ring1":
            material = "Crude Ring"
            break
        case "Ring2":
            material = "Basic Ring"
            break
        case "Ring3":
            material = "Improved Ring"
            break
        case "Ring4":
            material = "Tailored Ring"
            break
        case "Whisperin Core1":
            material = "LF Whisperin Core"
            break
        case "Whisperin Core2":
            material = "MF Whisperin Core"
            break
        case "Whisperin Core3":
            material = "HF Whisperin Core"
            break
        case "Whisperin Core4":
            material = "FF Whisperin Core"
            break
        default:
            break
    }
    return material
}

export const formatBossMats = (material: string) => {
    switch (material) {
        case "Elegy Tacet Core":
            material += " (Mourning Aix)"
            break
        case "Gold-Dissolving Feather":
            material += " (Impermanence Heron)"
            break
        case "Group Abomination Tacet Core":
            material += " (Mech Abomination)"
            break
        case "Hidden Thunder Tacet Core":
            material += " (Tempest Mephis)"
            break
        case "Rage Tacet Core":
            material += " (Inferno Rider)"
            break
        case "Roaring Rock Fist":
            material += " (Feilian Beringal)"
            break
        case "Sound-Keeping Tacet Core":
            material += " (Lampylumen Myriad)"
            break
        case "Strife Tacet Core":
            material += " (Crownless)"
            break
        case "Thundering Tacet Core":
            material += " (Thundering Mephis)"
            break
        default:
            break
    }
    return material
}

export const formatWeeklyBossMats = (material: string) => {
    switch (material) {
        case "Dreamless Feather":
            material += " (Dreamless)"
            break
        case "Monument Bell":
            material += " (Bell-Borne Geochelone)"
            break
        case "Unending Destruction":
            material += " (Scar)"
            break
        default:
            break
    }
    return material
}