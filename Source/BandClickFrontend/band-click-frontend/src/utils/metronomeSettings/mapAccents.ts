export const mapAccentedBeatsToAccentMap = (accentedBeats: number[], beatsPerBar: number): boolean[] => {
    let newMap: boolean[] = [];
    for (let i = 0; i<beatsPerBar; i++) {
        newMap[i] = accentedBeats.includes(i + 1) || false;
    }
    return newMap;
}

export const mapAccentMapToAccentedBeats = (accentMap: boolean[]): number[] => {
    let accentedBeats: number[] = [];
    accentMap.forEach((isAccented, index) => {
        if (isAccented) {
            accentedBeats.push(index + 1);
        }
    });
    return accentedBeats;
}
