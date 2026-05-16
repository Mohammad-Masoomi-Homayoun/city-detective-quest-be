import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import QuestForm from "./QuestForm";
import QuestItem from "./QuestItem";
import Swal from "sweetalert2";
import styles from "./QuestPanel.module.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function QuestPanel({ token }) {
  const [quests, setQuests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuest, setEditingQuest] = useState(null);

  const fetchQuests = useCallback(() => {
    axios
      .get(`${BACKEND_URL}/api/quest`)
      .then((res) => setQuests(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchQuests();
  }, [fetchQuests]);

  const handleCreate = (questData) => {
    axios
      .post(`${BACKEND_URL}/api/quest`, questData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Quest created successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        });
        setShowForm(false);
        fetchQuests();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err.response?.data?.message || "Error creating quest",
          width: "300px",
        });
      });
  };

  const handleUpdate = (questData) => {
    axios
      .put(`${BACKEND_URL}/api/quest/${editingQuest._id}`, questData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Quest updated successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        });
        setEditingQuest(null);
        setShowForm(false);
        fetchQuests();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err.response?.data?.message || "Error updating quest",
          width: "300px",
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This quest will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BACKEND_URL}/api/quest/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              text: "Quest deleted",
              showConfirmButton: false,
              timer: 1000,
              width: "300px",
            });
            fetchQuests();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              text: err.response?.data?.message || "Error deleting quest",
              width: "300px",
            });
          });
      }
    });
  };

  const handleEdit = (quest) => {
    setEditingQuest(quest);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingQuest(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quest Management</h2>

      <div className={styles.toolbar}>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>+ New Quest</Button>
        )}
      </div>

      {showForm && (
        <Card className={styles.formCard}>
          <QuestForm
            onSubmit={editingQuest ? handleUpdate : handleCreate}
            onCancel={handleCancel}
            initialData={editingQuest}
            token={token}
          />
        </Card>
      )}

      <div className={styles.list}>
        {quests.length === 0 && (
          <p className={styles.empty}>No quests found.</p>
        )}
        {quests.map((quest) => (
          <QuestItem
            key={quest._id}
            quest={quest}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestPanel;
