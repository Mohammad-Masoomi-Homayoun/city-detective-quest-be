import React from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./InvestigationSiteItem.module.css";

function InvestigationSiteItem({ site, onEdit, onDelete }) {
  const statusColor = {
    OPEN: "#2196f3",
    SOLVED: "#4caf50",
    FAILED: "#f44336",
  };

  return (
    <Card className={styles.item}>
      <div className={styles.header}>
        <h4 className={styles.title}>{site.title}</h4>
        <span
          className={styles.badge}
          style={{ background: statusColor[site.status] }}
        >
          {site.status}
        </span>
      </div>
      <div className={styles.meta}>
        <span>📍 {site.lat.toFixed(5)}, {site.lng.toFixed(5)}</span>
        <span>📏 {site.radius}m radius</span>
      </div>
      <div className={styles.actions}>
        <Button onClick={() => onEdit(site)}>Edit</Button>
        <Button onClick={() => onDelete(site._id)}>Delete</Button>
      </div>
    </Card>
  );
}

export default InvestigationSiteItem;
