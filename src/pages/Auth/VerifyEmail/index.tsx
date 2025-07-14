import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyEmail } from "@/store/thunks/userThunk";
import { toast } from "react-toastify";
import type { AppDispatch } from "@/store";

import "./index.scss";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

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
                toast.success("Verify email is successful!");
                navigate("/", { replace: true });
            } catch (error) {
                toast.error(error as string || 'Verify email error');
            } finally {
                setIsLoading(false);
            }
        };

        handleVerifyEmail();
    }, [searchParams, dispatch, navigate]);

    if (isLoading) {
        return (
            <div className="verify-email-container">
                <div className="verify-email-content">
                    <h2>Верифікація email...</h2>
                    <div className="loading-spinner"></div>
                </div>
            </div>
        );
    }

    return null;
} 