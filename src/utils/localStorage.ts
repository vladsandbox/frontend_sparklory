export function setLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage<T>(key: string, defaultValue: T): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : defaultValue;
}

export function clearLocalStorage(key: string): void {
    localStorage.removeItem(key);
}
