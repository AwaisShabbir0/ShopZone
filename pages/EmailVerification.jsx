import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import Link from 'next/link';

function EmailVerification() {
    const router = useRouter();
    const { id, token } = router.query;
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (id && token) { // Wait for router to be ready
            const verifyEmail = async () => {
                try {
                    const response = await axios.get(`/api/users/${id}/verify/${token}`);
                    setMessage(response.data.message);
                } catch (err) {
                    setMessage("Invalid or expired token.");
                }
            };
            verifyEmail();
        }
    }, [id, token]);

    return (
        <>
            <h1>{message}</h1>
            <Link href="/login">Go to Login</Link>
        </>
    );
}

export default EmailVerification;
