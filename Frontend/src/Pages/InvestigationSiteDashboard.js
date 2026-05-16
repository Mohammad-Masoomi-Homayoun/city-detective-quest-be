import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import MainHeader from "../components/MainHeader/MainHeader";
import InvestigationSitePanel from "../components/InvestigationSite/InvestigationSitePanel";
import Button from "../components/UI/Button/Button";

const InvestigationSiteDashboard = () => {
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
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <Button onClick={() => navigate("/admin/dashboard")}>← Back to Main Menu</Button>
      </div>
      <InvestigationSitePanel token={adminToken} />
    </>
  );
};

export default InvestigationSiteDashboard;
