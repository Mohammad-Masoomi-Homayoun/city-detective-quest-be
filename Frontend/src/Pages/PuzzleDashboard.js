import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainHeader from "../components/MainHeader/MainHeader";
import PuzzlePanel from "../components/Puzzle/PuzzlePanel";

const PuzzleDashboard = () => {
  const navigate = useNavigate();
  const adminToken = useSelector((state) => state.admin);

  const logoutHandler = () => {
    navigate("/admin/login");
  };

  return (
    <>
      <MainHeader onLogout={logoutHandler} />
      <PuzzlePanel token={adminToken} />
    </>
  );
};

export default PuzzleDashboard;
