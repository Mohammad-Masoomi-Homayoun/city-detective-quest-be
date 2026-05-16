import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import InvestigationSiteForm from "./InvestigationSiteForm";
import InvestigationSiteItem from "./InvestigationSiteItem";
import Swal from "sweetalert2";
import styles from "./InvestigationSitePanel.module.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function InvestigationSitePanel({ token }) {
  const [sites, setSites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSite, setEditingSite] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

  const fetchSites = useCallback(() => {
    const params = {};
    if (filterStatus) params.status = filterStatus;

    axios
      .get(`${BACKEND_URL}/api/investigation-site`, { params })
      .then((res) => setSites(res.data))
      .catch((err) => console.log(err));
  }, [filterStatus]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const handleCreate = (siteData) => {
    axios
      .post(`${BACKEND_URL}/api/investigation-site`, siteData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Site created successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        });
        setShowForm(false);
        fetchSites();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err.response?.data?.message || "Error creating site",
          width: "300px",
        });
      });
  };

  const handleUpdate = (siteData) => {
    axios
      .put(`${BACKEND_URL}/api/investigation-site/${editingSite._id}`, siteData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Site updated successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        });
        setEditingSite(null);
        setShowForm(false);
        fetchSites();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err.response?.data?.message || "Error updating site",
          width: "300px",
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This investigation site will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BACKEND_URL}/api/investigation-site/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              text: "Site deleted",
              showConfirmButton: false,
              timer: 1000,
              width: "300px",
            });
            fetchSites();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              text: err.response?.data?.message || "Error deleting site",
              width: "300px",
            });
          });
      }
    });
  };

  const handleEdit = (site) => {
    setEditingSite(site);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSite(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Investigation Sites</h2>

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.select}
            aria-label="Filter by status"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="SOLVED">Solved</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>

        {!showForm && (
          <Button onClick={() => setShowForm(true)}>+ New Site</Button>
        )}
      </div>

      {showForm && (
        <Card className={styles.formCard}>
          <InvestigationSiteForm
            onSubmit={editingSite ? handleUpdate : handleCreate}
            onCancel={handleCancel}
            initialData={editingSite}
          />
        </Card>
      )}

      <div className={styles.list}>
        {sites.length === 0 && (
          <p className={styles.empty}>No investigation sites found.</p>
        )}
        {sites.map((site) => (
          <InvestigationSiteItem
            key={site._id}
            site={site}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default InvestigationSitePanel;
