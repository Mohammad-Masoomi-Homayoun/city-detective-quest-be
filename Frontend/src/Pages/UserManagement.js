import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import MainHeader from "../components/MainHeader/MainHeader";
import AdminHome from "../components/Home/AdminHome";
import Button from "../components/UI/Button/Button";
import { adminSliceActions } from "../store/admin";

const UserManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminToken = useSelector((state) => state.admin);

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [adminToken, navigate]);

  const logoutHandler = () => {
    dispatch(adminSliceActions.logout());
    navigate("/admin/login");
  };

  if (!adminToken) return null;

  return (
    <>
      <MainHeader onLogout={logoutHandler} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <Button onClick={() => navigate("/admin/dashboard")}>← Back to Main Menu</Button>
      </div>
      <AdminHome />
    </>
  );
};

export default UserManagement;
