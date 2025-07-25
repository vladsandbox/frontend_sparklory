import { useEffect } from 'react';
const OAUTH_ALLOWED_ORIGIN = import.meta.env.VITE_APP_OAUTH_ALLOWED_ORIGIN ?? "";

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

type UseOAuthPopupAuthProps = {
    onAuthSuccess?: (tokens: Tokens) => void;
};
export function useOAuthPopupAuth({ onAuthSuccess }: UseOAuthPopupAuthProps = {}) {
    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            if (event.origin !== OAUTH_ALLOWED_ORIGIN) return;
            const { accessToken, refreshToken } = event.data || {};
            if (accessToken && refreshToken) {

                if (onAuthSuccess) {
                    onAuthSuccess({ accessToken, refreshToken });
                }
            }
        }
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onAuthSuccess]);
}

