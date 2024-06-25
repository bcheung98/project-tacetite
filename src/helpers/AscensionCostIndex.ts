export const SetCharacterCostsLevel = (start: number, stop: number, selected: boolean, name: string) => {

    let materialArray: [number[], number[], number[], number[], number[], number[], number[], number[], number[], number[], number[]]

    // Special case for Rover
    if (name.startsWith("Rover-")) {
        materialArray = [
            // Level ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90"]
            [0, 0, 5000, 0, 10000, 0, 15000, 0, 20000, 0, 40000, 0, 80000, 0], // Credits
            [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // Boss Material
            [0, 0, 0, 0, 4, 0, 8, 0, 12, 0, 16, 0, 20, 0], // Ascension Material
            [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Common Material
            [0, 0, 0, 0, 4, 0, 8, 0, 0, 0, 0, 0, 0, 0], // T2 Common Material
            [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 8, 0, 0, 0], // T3 Common Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0], // T4 Common Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Character XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T2 Character XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T3 Character XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T4 Character XP Material
        ]
    }
    else {
        materialArray = [
            // Level ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90"]
            [0, 0, 5000, 0, 10000, 0, 15000, 0, 20000, 0, 40000, 0, 80000, 0], // Credits
            [0, 0, 0, 0, 3, 0, 6, 0, 9, 0, 12, 0, 16, 0], // Boss Material
            [0, 0, 0, 0, 4, 0, 8, 0, 12, 0, 16, 0, 20, 0], // Ascension Material
            [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Common Material
            [0, 0, 0, 0, 4, 0, 8, 0, 0, 0, 0, 0, 0, 0], // T2 Common Material
            [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 8, 0, 0, 0], // T3 Common Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0], // T4 Common Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Character XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T2 Character XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T3 Character XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T4 Character XP Material
        ]
    }

    if (selected) {
        let costArray = materialArray.map((material, index) => (materialArray[index].slice(start, stop).reduce((a, c) => a + c)))
        return {
            credits: costArray[0],
            bossMat: costArray[1],
            ascensionMat: costArray[2],
            common1: costArray[3],
            common2: costArray[4],
            common3: costArray[5],
            common4: costArray[6],
            xp1: costArray[7],
            xp2: costArray[8],
            xp3: costArray[9],
            xp4: costArray[10]
        }
    }
    else {
        return {
            credits: 0,
            bossMat: 0,
            ascensionMat: 0,
            common1: 0,
            common2: 0,
            common3: 0,
            common4: 0,
            xp1: 0,
            xp2: 0,
            xp3: 0,
            xp4: 0,
        }
    }

}

export const SetCharacterCostsSkill = (start: number, stop: number, selected: boolean) => {

    let materialArray = [
        // Level [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        [0, 1500, 2000, 4500, 6000, 16000, 30000, 50000, 70000, 100000], // Credits
        [0, 2, 3, 0, 0, 0, 0, 0, 0, 0], // T1 Forgery Material
        [0, 0, 0, 2, 3, 0, 0, 0, 0, 0], // T2 Forgery Material
        [0, 0, 0, 0, 0, 3, 5, 0, 0, 0], // T3 Forgery Material
        [0, 0, 0, 0, 0, 0, 0, 2, 3, 6], // T4 Forgery Material
        [0, 2, 3, 0, 0, 0, 0, 0, 0, 0], // T1 Common Material
        [0, 0, 0, 2, 3, 0, 0, 0, 0, 0], // T2 Common Material
        [0, 0, 0, 0, 0, 2, 3, 0, 0, 0], // T3 Common Material
        [0, 0, 0, 0, 0, 0, 0, 2, 3, 4], // T4Common Material
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1], // Weekly Boss Material
    ]

    if (selected) {
        let costArray = materialArray.map((material, index) => (materialArray[index].slice(start, stop).reduce((a, c) => a + c)))
        return {
            credits: costArray[0],
            forgery1: costArray[1],
            forgery2: costArray[2],
            forgery3: costArray[3],
            forgery4: costArray[4],
            common1: costArray[5],
            common2: costArray[6],
            common3: costArray[7],
            common4: costArray[8],
            weeklyBossMat: costArray[9]
        }
    }
    else {
        return {
            credits: 0,
            forgery1: 0,
            forgery2: 0,
            forgery3: 0,
            forgery4: 0,
            common1: 0,
            common2: 0,
            common3: 0,
            common4: 0,
            weeklyBossMat: 0
        }
    }

}

export const SetCharacterCostsNode = (nodeType: number, selected: boolean) => {

    // [Credits, T3 Forgery Material, T4 Forgery Material, T3 Common Material, T4 Common Material, Weekly Boss Material]
    let costArray = nodeType === 1 ? [50000, 3, 0, 3, 0, 0] : [100000, 0, 3, 0, 3, 1]

    if (selected) {
        return {
            credits: costArray[0],
            forgery3: costArray[1],
            forgery4: costArray[2],
            common3: costArray[3],
            common4: costArray[4],
            weeklyBossMat: costArray[5]
        }
    }
    else {
        return {
            credits: 0,
            forgery3: 0,
            forgery4: 0,
            common3: 0,
            common4: 0,
            weeklyBossMat: 0
        }
    }

}

export const SetCharacterCostsPassive = (nodeType: number, selected: boolean) => {

    // [Credits, T2 Forgery Material, T3 Forgery Material, T2 Common Material, T3 Common Material, Weekly Boss Material]
    let costArray = nodeType === 1 ? [10000, 3, 0, 3, 0, 1] : [20000, 0, 3, 0, 3, 1]

    if (selected) {
        return {
            credits: costArray[0],
            forgery2: costArray[1],
            forgery3: costArray[2],
            common2: costArray[3],
            common3: costArray[4],
            weeklyBossMat: costArray[5]
        }
    }
    else {
        return {
            credits: 0,
            forgery2: 0,
            forgery3: 0,
            common2: 0,
            common3: 0,
            weeklyBossMat: 0
        }
    }

}

export const SetWeaponCostsLevel = (start: number, stop: number, rarity: number) => {

    let materialArray: [number[], number[], number[], number[], number[], number[], number[], number[], number[], number[], number[], number[], number[]] | [number[], number[], number[], number[], number[], number[], number[], number[], number[]]

    if (rarity === 5) {
        materialArray = [
            // Level [1, 20, 20+, 40, 40+, 50, 50+, 60, 60+, 70, 70+, 80, 80+, 90] 
            [0, 0, 10000, 0, 20000, 0, 40000, 0, 60000, 0, 80000, 0, 120000, 0], // Credits
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T2 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T3 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T4 Weapon XP Material
            [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Forgery Material
            [0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0], // T2 Forgery Material
            [0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0], // T3 Forgery Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 12, 0], // T4 Forgery Material
            [0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Common Material
            [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T2 Common Material
            [0, 0, 0, 0, 0, 0, 4, 0, 6, 0, 0, 0, 0, 0], // T3 Common Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 8, 0], // T4 Common Material
        ]
    }
    else if (rarity === 4) {
        materialArray = [
            // Level [1, 20, 20+, 40, 40+, 50, 50+, 60, 60+, 70, 70+, 80, 80+, 90] 
            [0, 0, 8000, 0, 16000, 0, 32000, 0, 48000, 0, 64000, 0, 96000, 0], // Credits
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T2 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T3 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T4 Weapon XP Material
            [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Forgery Material
            [0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0], // T2 Forgery Material
            [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0], // T3 Forgery Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 10, 0], // T4 Forgery Material
            [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Common Material
            [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T2 Common Material
            [0, 0, 0, 0, 0, 0, 4, 0, 5, 0, 0, 0, 0, 0], // T3 Common Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 7, 0], // T4 Common Material
        ]
    }
    else if (rarity === 3) {
        materialArray = [
            // Level [1, 20, 20+, 40, 40+, 50, 50+, 60, 60+, 70, 70+, 80, 80+, 90] 
            [0, 0, 6000, 0, 12000, 0, 24000, 0, 36000, 0, 48000, 0, 72000, 0], // Credits
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T2 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T3 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T4 Weapon XP Material
            [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Forgery Material
            [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0], // T2 Forgery Material
            [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0], // T3 Forgery Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 8, 0], // T4 Forgery Material
            [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Common Material
            [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T2 Common Material
            [0, 0, 0, 0, 0, 0, 3, 0, 4, 0, 0, 0, 0, 0], // T3 Common Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 5, 0], // T4 Common Material
        ]
    }
    else if (rarity === 2) {
        materialArray = [
            // Level [1, 20, 20+, 40, 40+, 50, 50+, 60, 60+, 70]
            [0, 0, 4000, 0, 8000, 0, 16000, 0, 24000, 0], // Credits
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T2 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T3 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T4 Weapon XP Material
            [0, 0, 0, 0, 3, 0, 0, 0, 0, 0], // T1 Forgery Material
            [0, 0, 0, 0, 0, 0, 4, 0, 0, 0], // T2 Forgery Material
            [0, 0, 0, 0, 0, 0, 0, 0, 3, 0], // T3 Forgery Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T4 Forgery Material
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0], // T1 Common Material
            [0, 0, 0, 0, 3, 0, 0, 0, 0, 0], // T2 Common Material
            [0, 0, 0, 0, 0, 0, 2, 0, 3, 0], // T3 Common Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T4 Common Material
        ]
    }
    else {
        materialArray = [
            // Level [1, 20, 20+, 40, 40+, 50, 50+, 60, 60+, 70]
            [0, 0, 2000, 0, 4000, 0, 8000, 0, 12000, 0], // Credits
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T1 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T2 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T3 Weapon XP Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T4 Weapon XP Material
            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0], // T1 Forgery Material
            [0, 0, 0, 0, 0, 0, 2, 0, 0, 0], // T2 Forgery Material
            [0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // T3 Forgery Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T4 Forgery Material
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0], // T1 Common Material
            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0], // T2 Common Material
            [0, 0, 0, 0, 0, 0, 1, 0, 2, 0], // T3 Common Material
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // T4 Common Material
        ]
    }

    let costArray = materialArray.map((material, index) => (materialArray[index].slice(start, stop).reduce((a, c) => a + c)))

    return {
        credits: costArray[0],
        wep_xp1: costArray[1],
        wep_xp2: costArray[2],
        wep_xp3: costArray[3],
        wep_xp4: costArray[4],
        forgery1: costArray[5],
        forgery2: costArray[6],
        forgery3: costArray[7],
        forgery4: costArray[8],
        common1: costArray[9],
        common2: costArray[10],
        common3: costArray[11],
        common4: costArray[12]
    }

}