import React from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./QuestItem.module.css";

function QuestItem({ quest, onEdit, onDelete }) {
  const puzzle = quest.puzzle;
  const site = quest.investigationSite;

  return (
    <Card className={styles.item}>
      <div className={styles.header}>
        <h4 className={styles.title}>Quest</h4>
      </div>
      <div className={styles.details}>
        <div className={styles.section}>
          <span className={styles.label}>🧩 Puzzle:</span>
          <span>
            {puzzle ? `${puzzle.title} (${puzzle.type} - ${puzzle.difficulty})` : "N/A"}
          </span>
        </div>
        <div className={styles.section}>
          <span className={styles.label}>📍 Site:</span>
          <span>
            {site
              ? `${site.title} (${site.status} - ${site.lat.toFixed(3)}, ${site.lng.toFixed(3)})`
              : "N/A"}
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <Button onClick={() => onEdit(quest)}>Edit</Button>
        <Button onClick={() => onDelete(quest._id)}>Delete</Button>
      </div>
    </Card>
  );
}

export default QuestItem;
