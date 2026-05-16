import React, { useState } from "react";
import Button from "../UI/Button/Button";
import styles from "./InvestigationSiteForm.module.css";

const emptyForm = {
  title: "",
  lat: "",
  lng: "",
  radius: "",
  status: "OPEN",
};

function InvestigationSiteForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState(
    initialData
      ? {
          title: initialData.title || "",
          lat: initialData.lat || "",
          lng: initialData.lng || "",
          radius: initialData.radius || "",
          status: initialData.status || "OPEN",
        }
      : { ...emptyForm }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      lat: Number(form.lat),
      lng: Number(form.lng),
      radius: Number(form.radius),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>{initialData ? "Edit Site" : "Create New Investigation Site"}</h3>

      <div className={styles.field}>
        <label htmlFor="site-title">Title *</label>
        <input
          id="site-title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="site-lat">Latitude *</label>
          <input
            id="site-lat"
            name="lat"
            type="number"
            step="any"
            value={form.lat}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="site-lng">Longitude *</label>
          <input
            id="site-lng"
            name="lng"
            type="number"
            step="any"
            value={form.lng}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="site-radius">Radius (m) *</label>
          <input
            id="site-radius"
            name="radius"
            type="number"
            value={form.radius}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="site-status">Status</label>
        <select
          id="site-status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="OPEN">Open</option>
          <option value="SOLVED">Solved</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      <div className={styles.actions}>
        <Button type="submit">{initialData ? "Update" : "Create"}</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

export default InvestigationSiteForm;
