export function formatExpiryDate(raw: string): string {
    const digits = raw.replace(/[^\d]/g, "");
    if (digits.length >= 3) {
        return digits.slice(0, 2) + "/" + digits.slice(2, 4);
    }
    return digits;
}

export function formatCardNumber(raw: string): string {
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
}