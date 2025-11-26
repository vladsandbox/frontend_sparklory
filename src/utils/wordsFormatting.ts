export const capitalizeFirstLetter = (text: string) =>
    text.replace(/^\w/g, char => char.toUpperCase());

export const lowEachFirstLetter = (text: string) =>
    text.replace(/\b\w/g, char => char.toLowerCase());

export const capitalizeEachFirstLetter = (text: string) =>
    text.replace(/\b\w/g, char => char.toUpperCase());

export const spaceBetweenWords = (text: string) =>
    text.replace(/[-_]/g, ' ');

export const allToLowerCase = (text: string) =>
    text.toLowerCase();
