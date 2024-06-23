export const CharacterCosts = (type: string) => {

    if (type === "level") {
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
        return [
            [0, 0, 5000, 0, 10000, 0, 15000, 0, 20000, 0, 40000, 0, 80000, 0],
            [0, 0, 0, 0, 3, 0, 6, 0, 9, 0, 12, 0, 16, 0],
            [0, 0, 0, 0, 4, 0, 8, 0, 12, 0, 16, 0, 20, 0],
            [0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 8, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]

    }
    if (["attack", "skill", "ultimate", "circuit", "intro"].includes(type)) {
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
        return [
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
    }
    if (type === "node1") {
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
        return [
        ]
    }
    if (type === "node2") {
        return [
        ]
    }
    if (type === "passive1") {
        return [
        ]
    }
    if (type === "passive2") {
        return [
        ]
    }
    else {
        return []
    }
}