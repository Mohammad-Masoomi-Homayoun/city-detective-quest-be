import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../UI/Button/Button";
import styles from "./QuestForm.module.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function QuestForm({ onSubmit, onCancel, initialData, token }) {
  const [puzzles, setPuzzles] = useState([]);
  const [sites, setSites] = useState([]);
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [selectedPuzzle, setSelectedPuzzle] = useState(
    initialData?.puzzle?._id || initialData?.puzzle || ""
  );
  const [selectedSite, setSelectedSite] = useState(
    initialData?.investigationSite?._id || initialData?.investigationSite || ""
  );

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/puzzle`)
      .then((res) => setPuzzles(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`${BACKEND_URL}/api/investigation-site`)
      .then((res) => setSites(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      puzzle: selectedPuzzle,
      investigationSite: selectedSite,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>{initialData ? "Edit Quest" : "Create New Quest"}</h3>

      <div className={styles.field}>
        <label htmlFor="quest-title">Title *</label>
        <input
          id="quest-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="quest-description">Description *</label>
        <textarea
          id="quest-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="quest-puzzle">Puzzle *</label>
        <select
          id="quest-puzzle"
          value={selectedPuzzle}
          onChange={(e) => setSelectedPuzzle(e.target.value)}
          required
        >
          <option value="">-- Select a Puzzle --</option>
          {puzzles.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title} ({p.type} - {p.difficulty})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="quest-site">Investigation Site *</label>
        <select
          id="quest-site"
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
          required
        >
          <option value="">-- Select an Investigation Site --</option>
          {sites.map((s) => (
            <option key={s._id} value={s._id}>
              {s.title} ({s.status} - {s.lat.toFixed(3)}, {s.lng.toFixed(3)})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.actions}>
        <Button type="submit">{initialData ? "Update" : "Create"}</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

export default QuestForm;
