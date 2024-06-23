export const GetRarityColor = (rarity: number) => {
    if (rarity === 5) {
        return "rgb(255, 208, 112)"
    }
    if (rarity === 4) {
        return "rgb(175, 134, 255)"
    }
    if (rarity === 3) {
        return "rgb(105, 157, 237)"
    }
    if (rarity === 2) {
        return "rgb(104, 211, 145)"
    }
    if (rarity === 1) {
        return "rgb(175, 175, 175)"
    }
}

export const GetBackgroundColor = (rarity: number, opacity = 0.45) => {
    if (rarity === 5) {
        return `rgba(255, 199, 129, ${opacity})`;
    }
    if (rarity === 4) {
        return `rgba(193, 153, 253, ${opacity})`;
    }
    if (rarity === 3) {
        return `rgba(115, 176, 244, ${opacity})`;
    }
    if (rarity === 2) {
        return `rgba(114, 169, 156, ${opacity})`;
    }
    if (rarity === 1) {
        return `rgba(195, 195, 195, ${opacity})`;
    }
}