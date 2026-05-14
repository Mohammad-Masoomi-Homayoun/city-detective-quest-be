import React from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./PuzzleItem.module.css";

function PuzzleItem({ puzzle, onEdit, onDelete }) {
  const difficultyColor = {
    easy: "#4caf50",
    medium: "#ff9800",
    hard: "#f44336",
    expert: "#9c27b0",
  };

  return (
    <Card className={styles.item}>
      <div className={styles.header}>
        <h4 className={styles.title}>{puzzle.title}</h4>
        <div className={styles.badges}>
          <span className={styles.badge} style={{ background: difficultyColor[puzzle.difficulty] }}>
            {puzzle.difficulty}
          </span>
          <span className={styles.badgeType}>{puzzle.type}</span>
          <span className={styles.badgeStatus}>{puzzle.status}</span>
        </div>
      </div>
      <p className={styles.description}>{puzzle.description}</p>
      <div className={styles.meta}>
        {puzzle.timeLimit && <span>⏱ {puzzle.timeLimit}s</span>}
        <span>🔑 {puzzle.clues?.length || 0} clues</span>
        <span>💡 {puzzle.hints?.length || 0} hints</span>
      </div>
      <div className={styles.actions}>
        <Button onClick={() => onEdit(puzzle)}>Edit</Button>
        <Button onClick={() => onDelete(puzzle._id)}>Delete</Button>
      </div>
    </Card>
  );
}

export default PuzzleItem;
