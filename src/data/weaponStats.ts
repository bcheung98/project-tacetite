export type WeaponBaseATK = keyof typeof baseATKScaling;

export const baseATKScaling = {
    "47": [47, 122, 153, 232, 264, 303, 335, 374, 406, 445, 476, 516, 547, 587],
    "40": [40, 104, 130, 198, 224, 258, 285, 318, 345, 379, 405, 439, 466, 500],
    "37": [37, 96, 120, 183, 207, 239, 263, 294, 319, 350, 375, 406, 431, 462],
    "33": [33, 85, 107, 163, 185, 213, 235, 263, 285, 312, 334, 362, 384, 412],
    "32": [32, 85, 107, 163, 185, 213, 234, 262, 284, 312, 334, 362, 384, 412],
    "31": [31, 80, 101, 153, 174, 200, 221, 247, 267, 293, 314, 340, 361, 387],
    "27": [27, 70, 88, 133, 151, 174, 192, 215, 233, 255, 273, 296, 314, 337],
    "26": [26, 67, 84, 128, 146, 168, 185, 207, 224, 246, 263, 285, 303, 325],
    "24": [24, 62, 78, 118, 134, 155, 171, 191, 207, 227, 243, 263, 279, 300],
    "22": [22, 57, 71, 108, 123, 142, 156, 175, 190, 208],
    "20": [20, 52, 65, 99, 112, 129, 142, 159, 172, 189],
};

export type WeaponSubStat =
    | "ATK"
    | "Crit Rate"
    | "Crit DMG"
    | "HP"
    | "Energy Regen"
    | "DEF";

type WeaponSubStatInfo = Partial<Record<WeaponSubStat, string[]>>;

export const subStats: Record<WeaponBaseATK, WeaponSubStatInfo> = {
    "47": {
        "ATK": ["8.1%", "14.3%", "14.3%", "20.6%", "20.6%", "23.8%", "23.8%", "26.9%", "26.9%", "30.1%", "30.1%", "33.2%", "33.2%", "36.4%"],
        "Crit Rate": ["5.4%", "9.5%", "9.5%", "13.7%", "13.7%", "15.8%", "15.8%", "17.9%", "17.9%", "20.0%", "20.0%", "22.1%", "22.1%", "24.3%"],
        "Crit DMG": ["10.8%", "19.1%", "19.1%", "27.5%", "27.5%", "31.7%", "31.7%", "35.9%", "35.9%", "40.1%", "40.1%", "44.3%", "44.3%", "48.6%"],
    },
    "40": {
        "ATK": ["11.9%", "21.3%", "21.3%", "30.6%", "30.6%", "35.3%", "35.3%", "39.9%", "39.9%", "44.6%", "44.6%", "49.3%", "49.3%", "53.9%"],
        "Crit Rate": ["8.0%", "14.2%", "14.2%", "20.4%", "20.4%", "23.5%", "23.5%", "26.6%", "26.6%", "29.7%", "29.7%", "32.8%", "32.8%", "36.0%"],
        "Crit DMG": ["16.0%", "28.4%", "28.4%", "40.8%", "40.8%", "47.0%", "47.0%", "53.2%", "53.2%", "59.4%", "59.4%", "65.6%", "65.6%", "72.0%"],
    },
    "37": {
        "ATK": ["4.0%", "7.1%", "7.1%", "10.3%", "10.3%", "11.9%", "11.9%", "13.4%", "13.4%", "15.0%", "15.0%", "16.6%", "16.6%", "18.2%"],
    },
    "33": {
        "HP": ["6.7%", "11.9%", "11.9%", "17.2%", "17.2%", "19.8%", "19.8%", "22.4%", "22.4%", "25.1%", "25.1%", "27.7%", "27.7%", "30.3%"],
        "ATK": ["6.7%", "11.9%", "11.9%", "17.2%", "17.2%", "19.8%", "19.8%", "22.4%", "22.4%", "25.1%", "25.1%", "27.7%", "27.7%", "30.3%"],
        "Energy Regen": ["7.2%", "12.7%", "12.7%", "18.3%", "18.3%", "21.1%", "21.1%", "23.9%", "23.9%", "26.7%", "26.7%", "29.5%", "29.5%", "32.4%"],
        "Crit Rate": ["4.5%", "7.9%", "7.9%", "11.4%", "11.4%", "13.2%", "13.2%", "14.9%", "14.9%", "16.7%", "16.7%", "18.4%", "18.4%", "20.2%"],
    },
    "32": {
        "Energy Regen": ["17.1%", "30.4%", "30.4%", "43.7%", "43.7%", "50.3%", "50.3%", "57.0%", "57.0%", "63.6%", "63.6%", "70.3%", "70.3%", "77.0%"],
    },
    "31": {
        "ATK": ["8.1%", "14.3%", "14.3%", "20.6%", "20.6%", "23.8%", "23.8%", "26.9%", "26.9%", "30.1%", "30.1%", "33.2%", "33.2%", "36.4%"],
        "Energy Regen": ["8.6%", "15.3%", "15.3%", "22.0%", "22.0%", "25.4%", "25.4%", "28.7%", "28.7%", "32.1%", "32.1%", "35.5%", "35.5%", "38.8%"],
    },
    "27": {
        "DEF": ["13.6%", "24.3%", "24.3%", "34.9%", "34.9%", "40.2%", "40.2%", "45.5%", "45.5%", "50.9%", "50.9%", "56.2%", "56.2%", "61.5%"],
        "Energy Regen": ["11.5%", "20.4%", "20.4%", "29.4%", "29.4%", "33.9%", "33.9%", "38.3%", "38.3%", "42.8%", "42.8%", "47.3%", "47.3%", "51.8%"],
    },
    "26": {
        "ATK": ["5.4%", "9.5%", "9.5%", "13.7%", "13.7%", "15.8%", "15.8%", "17.9%", "17.9%", "20.0%", "20.0%", "22.1%", "22.1%", "24.3%"],
        "DEF": ["6.8%", "12.1%", "12.1%", "17.4%", "17.4%", "20.1%", "20.1%", "22.7%", "22.7%", "25.4%", "25.4%", "28.1%", "28.1%", "30.7%"],
    },
    "24": {
        "HP": ["6.7%", "11.9%", "11.9%", "17.2%", "17.2%", "19.8%", "19.8%", "22.4%", "22.4%", "25.1%", "25.1%", "27.7%", "27.7%", "30.3%"],
        "ATK": ["6.7%", "11.9%", "11.9%", "17.2%", "17.2%", "19.8%", "19.8%", "22.4%", "22.4%", "25.1%", "25.1%", "27.7%", "27.7%", "30.3%"],
        "DEF": ["8.5%", "15.1%", "15.1%", "21.8%", "21.8%", "25.1%", "25.1%", "28.4%", "28.4%", "31.8%", "31.8%", "35.1%", "35.1%", "38.4%"],
        "Energy Regen": ["7.2%", "12.7%", "12.7%", "18.3%", "18.3%", "21.1%", "21.1%", "23.9%", "23.9%", "26.7%", "26.7%", "29.5%", "29.5%", "32.4%"],
        "Crit DMG": ["9.0%", "15.9%", "15.9%", "22.9%", "22.9%", "26.4%", "26.4%", "29.9%", "29.9%", "33.4%", "33.4%", "36.9%", "36.9%", "40.5%"],
    },
    "22": {
        "ATK": ["3.2%", "5.8%", "5.8%", "8.4%", "8.4%", "9.7%", "9.7%", "10.9%", "10.9%", "12.2%"],
    },
    "20": {
        "ATK": ["2.5%", "4.5%", "4.5%", "6.5%", "6.5%", "7.5%", "7.5%", "8.4%", "8.4%", "9.4%"],
    },
};