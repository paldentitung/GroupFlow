import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { acceptInvite } from "../services/membersService.js";
import { jwtDecode } from "jwt-decode";

function AcceptInvitePage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // ✅ prevents double API call in React StrictMode (dev)
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const acceptInvitation = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!token) {
          throw new Error("Invalid invite link");
        }

        let decoded;

        try {
          decoded = jwtDecode(token);
        } catch {
          throw new Error("Invalid or corrupted invite token");
        }

        const projectId = decoded?.projectId;

        if (!projectId) {
          throw new Error("Invalid invitation data");
        }

        const response = await acceptInvite(projectId, token);

        if (!response?.success) {
          throw new Error(response?.message || "Failed to accept invitation");
        }

        setSuccess(true);

        setTimeout(() => {
          navigate("/projects");
        }, 1500);
      } catch (err) {
        console.error("Accept invite error:", err);

        setError(err?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    acceptInvitation();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white rounded-2xl shadow-xl border p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-5">📩</div>

        <h1 className="text-2xl font-bold mb-3">Project Invitation</h1>

        {loading && <p className="text-gray-500">Accepting invitation...</p>}

        {!loading && success && (
          <div>
            <p className="text-green-600 font-medium">
              Invitation accepted successfully
            </p>

            <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
          </div>
        )}

        {!loading && error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default AcceptInvitePage;
