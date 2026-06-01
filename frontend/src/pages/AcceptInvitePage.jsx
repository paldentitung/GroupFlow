import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { acceptInvite } from "../services/membersService";

function AcceptInvitePage() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const acceptInvitation = async () => {
      try {
        setLoading(true);

        console.log(token);

        // Replace this with API call

        // const response =
        // await acceptInvite(token);

        // if(response.success){

        setSuccess(true);

        setTimeout(() => {
          navigate("/projects");
        }, 1500);

        // }
      } catch (err) {
        console.error(err);

        setError("Failed to accept invitation.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      acceptInvitation();
    }
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
