export type OAuthProvider = 'google' | 'facebook';

export function openOAuthPopup(provider: OAuthProvider): Window | null {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL ?? '';
    const width = 500;
    const height = 600;

    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const url = `${baseUrl}/auth/${provider}`;

    const popup = window.open(
        url,
        '_blank',
        `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
        console.error('Failed to open popup. Your browser may be blocking windows.');
        return null;
    }

    return popup;
} 