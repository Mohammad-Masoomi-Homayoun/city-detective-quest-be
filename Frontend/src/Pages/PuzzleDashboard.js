import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import MainHeader from "../components/MainHeader/MainHeader";
import PuzzlePanel from "../components/Puzzle/PuzzlePanel";

const PuzzleDashboard = () => {
  const navigate = useNavigate();
  const adminToken = useSelector((state) => state.admin);

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [adminToken, navigate]);

  const logoutHandler = () => {
    navigate("/admin/login");
  };

  if (!adminToken) return null;

  return (
    <>
      <MainHeader onLogout={logoutHandler} />
      <PuzzlePanel token={adminToken} />
    </>
  );
};

export default PuzzleDashboard;
