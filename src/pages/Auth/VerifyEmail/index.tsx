import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyEmail } from "@/store/thunks/userThunk";
import { toast } from "react-toastify";
import type { AppDispatch } from "@/store";

import "./index.scss";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const handleVerifyEmail = async () => {
            const email = searchParams.get('email');
            const code = searchParams.get('code');


            if (!email || !code) {
                toast.error('Missing required parameters for verification');
                setIsLoading(false);
                return;
            }

            try {
                await dispatch(verifyEmail({
                    email: decodeURIComponent(email),
                    code
                })).unwrap();
            } catch (error) {
                setError(error as string || 'Verify email error');
            } finally {
                setIsLoading(false);
            }
        };

        handleVerifyEmail();
    }, [searchParams, dispatch]);

    if (isLoading) {
        return (
            <div className="verify-email-container">
                <div className="verify-email-content">
                    <h2 className="h2">Email verification...</h2>
                    <div className="loading-spinner"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="verify-email-container">
                <div className="verify-email-content">
                    <h2 className="h2">Verification error!</h2>
                    <p className="text-xs">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="verify-email-container">
            <div className="verify-email-content">
                <h2 className="h2">Verification successful!</h2>
                <p className="text-xs">You have successfully verified your email.</p>
            </div>
        </div>
    );
} 