import { useNavigate } from "react-router-dom";
import AdminHome from "../components/Home/AdminHome";
import { useDispatch } from "react-redux";
import MainHeader from "../components/MainHeader/MainHeader";
import { adminSliceActions } from "../store/admin";
import Button from "../components/UI/Button/Button";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(adminSliceActions.logout());
    navigate("/admin/login");
  };

  return (
    <>
      <MainHeader onLogout={logoutHandler} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", gap: "1rem" }}>
        <Button onClick={() => navigate("/admin/puzzles")}>Manage Puzzles</Button>
        <Button onClick={() => navigate("/admin/investigation-sites")}>Investigation Sites</Button>
      </div>
      <AdminHome />
    </>
  );
};

export default AdminDashboard;
