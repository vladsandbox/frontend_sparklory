import { useEffect } from 'react';
const OAUTH_ALLOWED_ORIGIN = import.meta.env.VITE_APP_OAUTH_ALLOWED_ORIGIN ?? "";
export default function OAuthCallback(){
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (window.opener && accessToken && refreshToken) {
            window.opener.postMessage(
                { accessToken, refreshToken },
                OAUTH_ALLOWED_ORIGIN
            );
            window.close();
        }
    }, []);
    return <div> Authorization... You can close this window</div>;
};
