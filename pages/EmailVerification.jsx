import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EmailVerification() {
    const { id, token } = useParams();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`/api/users/${id}/verify/${token}`);
                setMessage(response.data.message);
            } catch (err) {
                setMessage("Invalid or expired token.");
            }
        };
        verifyEmail();
    }, [id, token]);

    return <h1>{message}</h1>;
}

export default EmailVerification;
