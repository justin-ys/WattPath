export enum Season {
    Fall = "Fall",
    Spring = "Spring",
    Winter = "Winter",
}

export const seasonToNumber = (season: Season) => {
    if (season == Season.Winter) return 0;
    if (season == Season.Spring) return 1;
    else return 2;
}

export const numberToSeason = (number: number) => {
    if (number == 0) return Season.Winter;
    if (number == 1) return Season.Spring;
    else return Season.Fall;
}

export const dateToOffset = (year: number, season: Season, startYear: number, startSeason: Season) => {
    let offset = 3*(year - startYear);
    offset += seasonToNumber(season) - seasonToNumber(startSeason);
    return offset;
}

export const offsetToDate = (offset: number, startYear: number, startSeason: Season) => {
    let year = startYear + Math.floor(offset / 3);
    const offsetSeason = (seasonToNumber(startSeason) + offset % 3) % 3;
    if (seasonToNumber(startSeason) > offsetSeason) year += 1;
    const season = numberToSeason(offsetSeason);
    return {year, season};
}