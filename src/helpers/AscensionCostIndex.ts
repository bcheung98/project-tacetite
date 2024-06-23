export const SetCharacterCostsLevel = (start: number, stop: number, selected: boolean) => {

    let materialArray = [
        // Level ["1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90"]
        /*
            Credits
            Boss Material
            Ascension Material
            T1 Common Material
            T2 Common Material
            T3 Common Material
            T4 Common Material
            T1 Character EXP Material
            T2 Character EXP Material
            T3 Character EXP Material
            T4 Character EXP Material
        */
        [0, 0, 5000, 0, 10000, 0, 15000, 0, 20000, 0, 40000, 0, 80000, 0],
        [0, 0, 0, 0, 3, 0, 6, 0, 9, 0, 12, 0, 16, 0],
        [0, 0, 0, 0, 4, 0, 8, 0, 12, 0, 16, 0, 20, 0],
        [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 0, 8, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 8, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

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
        /*
           Credits
           T1 Forgery Material
           T2 Forgery Material
           T3 Forgery Material
           T4 Forgery Material
           T1 Common Material
           T2 Common Material
           T3 Common Material
           T4 Common Material
           Weekly Boss Material
        */
        [0, 1500, 2000, 4500, 6000, 16000, 30000, 50000, 70000, 100000],
        [0, 2, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 5, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 3, 6],
        [0, 2, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 3, 4],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
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