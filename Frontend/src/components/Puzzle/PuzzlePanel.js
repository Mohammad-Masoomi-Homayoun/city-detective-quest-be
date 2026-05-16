import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import PuzzleForm from "./PuzzleForm";
import PuzzleItem from "./PuzzleItem";
import Swal from "sweetalert2";
import styles from "./PuzzlePanel.module.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function PuzzlePanel({ token }) {
  const [puzzles, setPuzzles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPuzzle, setEditingPuzzle] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const fetchPuzzles = useCallback(() => {
    const params = {};
    if (filterType) params.type = filterType;
    if (filterDifficulty) params.difficulty = filterDifficulty;

    axios
      .get(`${BACKEND_URL}/api/puzzle`, { params })
      .then((res) => setPuzzles(res.data))
      .catch((err) => console.log(err));
  }, [filterType, filterDifficulty]);

  useEffect(() => {
    fetchPuzzles();
  }, [fetchPuzzles]);

  const handleCreate = (puzzleData) => {
    axios
      .post(`${BACKEND_URL}/api/puzzle`, puzzleData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Puzzle created successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        });
        setShowForm(false);
        fetchPuzzles();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err.response?.data?.message || "Error creating puzzle",
          width: "300px",
        });
      });
  };

  const handleUpdate = (puzzleData) => {
    axios
      .put(`${BACKEND_URL}/api/puzzle/${editingPuzzle._id}`, puzzleData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Puzzle updated successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        });
        setEditingPuzzle(null);
        setShowForm(false);
        fetchPuzzles();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err.response?.data?.message || "Error updating puzzle",
          width: "300px",
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This puzzle will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BACKEND_URL}/api/puzzle/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              text: "Puzzle deleted",
              showConfirmButton: false,
              timer: 1000,
              width: "300px",
            });
            fetchPuzzles();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              text: err.response?.data?.message || "Error deleting puzzle",
              width: "300px",
            });
          });
      }
    });
  };

  const handleEdit = (puzzle) => {
    setEditingPuzzle(puzzle);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPuzzle(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Puzzle Management</h2>

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.select}
            aria-label="Filter by type"
          >
            <option value="">All Types</option>
            <option value="code">Code</option>
            <option value="riddle">Riddle</option>
            <option value="cipher">Cipher</option>
            <option value="physical">Physical</option>
            <option value="gps">GPS</option>
            <option value="audio">Audio</option>
            <option value="image">Image</option>
            <option value="sequence">Sequence</option>
            <option value="logic">Logic</option>
            <option value="qr">QR</option>
            <option value="augmented-reality">Augmented Reality</option>
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className={styles.select}
            aria-label="Filter by difficulty"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        {!showForm && (
          <Button onClick={() => setShowForm(true)}>+ New Puzzle</Button>
        )}
      </div>

      {showForm && (
        <Card className={styles.formCard}>
          <PuzzleForm
            onSubmit={editingPuzzle ? handleUpdate : handleCreate}
            onCancel={handleCancel}
            initialData={editingPuzzle}
          />
        </Card>
      )}

      <div className={styles.list}>
        {puzzles.length === 0 && (
          <p className={styles.empty}>No puzzles found.</p>
        )}
        {puzzles.map((puzzle) => (
          <PuzzleItem
            key={puzzle._id}
            puzzle={puzzle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default PuzzlePanel;
