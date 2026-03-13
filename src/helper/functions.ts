export function splitArray<T>(inputArray: T[]): { firstArray: T[]; secondArray: T[] } {
    const firstArray: T[] = [];
    const secondArray: T[] = [];

    for (let i = 0; i < inputArray.length; i++) {
        if (i % 5 < 3) {
            firstArray.push(inputArray[i]);
        } else {
            secondArray.push(inputArray[i]);
        }
    }

    return { firstArray, secondArray };
}

// Generates a random number between 4.6 and 5
export function getRandomRatingValue(): number {
    return Number((Math.random() * (5 - 4.6) + 4.6).toFixed(2));
}

// Generates a random integer between 150 and 450
export function getRandomReviewCount(): number {
    return Math.floor(Math.random() * (450 - 150 + 1)) + 150;
}