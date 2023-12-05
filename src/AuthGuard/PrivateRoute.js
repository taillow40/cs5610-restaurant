import { Navigate } from "react-router-dom";
import { useProfile } from "src/components/hooks/userHooks";

const AuthProtected = ({ children }) => {
  // const { userProfile, loading } = useProfile();
  const { loading, user } = useProfile();

  if (loading) {
    return;
  }

  return !user && !loading ? (
    <Navigate to={{ pathname: "/login" }} />
  ) : (
    children
  );
};

export default AuthProtected;
