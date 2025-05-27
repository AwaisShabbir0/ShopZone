import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const { id, token } = router.query;

  const [message, setMessage] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !token) return;

    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify?id=${id}&token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setMessage(data.message || "Verification successful.");
        } else {
          setMessage(data.message || "Verification failed.");
        }
      } catch (err) {
        setMessage("An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [id, token]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Email Verification</h1>
      <p>{loading ? "Verifying your email..." : message}</p>
    </div>
  );
}
