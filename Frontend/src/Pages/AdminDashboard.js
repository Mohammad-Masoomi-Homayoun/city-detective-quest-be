import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MainHeader from "../components/MainHeader/MainHeader";
import { adminSliceActions } from "../store/admin";
import Button from "../components/UI/Button/Button";

const AdminDashboard = () => {
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
      <div style={{ padding: "3rem 1rem", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
          Admin Management Panel
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div style={cardStyle}>
            <h4 style={cardTitle}>👥 Users</h4>
            <p style={cardDesc}>Manage user accounts</p>
            <Button onClick={() => navigate("/admin/users")}>Go</Button>
          </div>
          <div style={cardStyle}>
            <h4 style={cardTitle}>🧩 Puzzles</h4>
            <p style={cardDesc}>Create and manage puzzles</p>
            <Button onClick={() => navigate("/admin/puzzles")}>Go</Button>
          </div>
          <div style={cardStyle}>
            <h4 style={cardTitle}>📍 Investigation Sites</h4>
            <p style={cardDesc}>Manage investigation locations</p>
            <Button onClick={() => navigate("/admin/investigation-sites")}>Go</Button>
          </div>
          <div style={cardStyle}>
            <h4 style={cardTitle}>🗺️ Quests</h4>
            <p style={cardDesc}>Link puzzles to sites</p>
            <Button onClick={() => navigate("/admin/quests")}>Go</Button>
          </div>
        </div>
      </div>
    </>
  );
};

const cardStyle = {
  background: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: "12px",
  padding: "1.5rem",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

const cardTitle = {
  margin: "0 0 0.5rem",
  fontSize: "1.1rem",
  color: "#333",
};

const cardDesc = {
  margin: "0 0 1rem",
  fontSize: "0.85rem",
  color: "#777",
};

export default AdminDashboard;
