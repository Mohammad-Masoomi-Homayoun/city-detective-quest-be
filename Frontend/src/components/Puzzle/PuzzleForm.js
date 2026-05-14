import React, { useState } from "react";
import Button from "../UI/Button/Button";
import styles from "./PuzzleForm.module.css";

const PUZZLE_TYPES = [
  "code",
  "riddle",
  "cipher",
  "physical",
  "gps",
  "audio",
  "image",
  "sequence",
  "logic",
  "qr",
  "augmented-reality",
];

const DIFFICULTIES = ["easy", "medium", "hard", "expert"];

const emptyForm = {
  title: "",
  description: "",
  storyContext: "",
  type: "riddle",
  difficulty: "medium",
  status: "draft",
  timeLimit: "",
  clues: [{ text: "", image: "", audio: "", discovered: false }],
  hints: [{ level: 1, text: "", penaltyScore: 0 }],
  expectedSolution: { answer: "", caseSensitive: false },
  validation: { type: "exact", pattern: "" },
  scoring: { baseScore: 100, timeBonusPerSecond: 0, hintPenalty: 0 },
};

function PuzzleForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState(
    initialData
      ? {
          title: initialData.title || "",
          description: initialData.description || "",
          storyContext: initialData.storyContext || "",
          type: initialData.type || "riddle",
          difficulty: initialData.difficulty || "medium",
          status: initialData.status || "draft",
          timeLimit: initialData.timeLimit || "",
          clues:
            initialData.clues?.length > 0
              ? initialData.clues
              : emptyForm.clues,
          hints:
            initialData.hints?.length > 0
              ? initialData.hints
              : emptyForm.hints,
          expectedSolution:
            initialData.expectedSolution || emptyForm.expectedSolution,
          validation: initialData.validation || emptyForm.validation,
          scoring: initialData.scoring || emptyForm.scoring,
        }
      : { ...emptyForm }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleClueChange = (index, field, value) => {
    const updated = [...form.clues];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, clues: updated }));
  };

  const addClue = () => {
    setForm((prev) => ({
      ...prev,
      clues: [...prev.clues, { text: "", image: "", audio: "", discovered: false }],
    }));
  };

  const removeClue = (index) => {
    setForm((prev) => ({
      ...prev,
      clues: prev.clues.filter((_, i) => i !== index),
    }));
  };

  const handleHintChange = (index, field, value) => {
    const updated = [...form.hints];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, hints: updated }));
  };

  const addHint = () => {
    setForm((prev) => ({
      ...prev,
      hints: [
        ...prev.hints,
        { level: prev.hints.length + 1, text: "", penaltyScore: 0 },
      ],
    }));
  };

  const removeHint = (index) => {
    setForm((prev) => ({
      ...prev,
      hints: prev.hints.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      timeLimit: form.timeLimit ? Number(form.timeLimit) : undefined,
      scoring: {
        baseScore: Number(form.scoring.baseScore),
        timeBonusPerSecond: Number(form.scoring.timeBonusPerSecond),
        hintPenalty: Number(form.scoring.hintPenalty),
      },
      hints: form.hints.map((h) => ({
        ...h,
        level: Number(h.level),
        penaltyScore: Number(h.penaltyScore),
      })),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>{initialData ? "Edit Puzzle" : "Create New Puzzle"}</h3>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="puzzle-title">Title *</label>
          <input
            id="puzzle-title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="puzzle-type">Type *</label>
          <select
            id="puzzle-type"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            {PUZZLE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="puzzle-description">Description *</label>
        <textarea
          id="puzzle-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="puzzle-story">Story Context</label>
        <textarea
          id="puzzle-story"
          name="storyContext"
          value={form.storyContext}
          onChange={handleChange}
          rows={2}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="puzzle-difficulty">Difficulty *</label>
          <select
            id="puzzle-difficulty"
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="puzzle-status">Status</label>
          <select
            id="puzzle-status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="puzzle-timelimit">Time Limit (seconds)</label>
          <input
            id="puzzle-timelimit"
            name="timeLimit"
            type="number"
            value={form.timeLimit}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Solution */}
      <fieldset className={styles.fieldset}>
        <legend>Expected Solution *</legend>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="solution-answer">Answer</label>
            <input
              id="solution-answer"
              value={form.expectedSolution.answer}
              onChange={(e) =>
                handleNestedChange("expectedSolution", "answer", e.target.value)
              }
              required
            />
          </div>
          <div className={styles.fieldCheckbox}>
            <label>
              <input
                type="checkbox"
                checked={form.expectedSolution.caseSensitive}
                onChange={(e) =>
                  handleNestedChange(
                    "expectedSolution",
                    "caseSensitive",
                    e.target.checked
                  )
                }
              />
              Case Sensitive
            </label>
          </div>
        </div>
      </fieldset>

      {/* Validation */}
      <fieldset className={styles.fieldset}>
        <legend>Validation</legend>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="validation-type">Type</label>
            <select
              id="validation-type"
              value={form.validation.type}
              onChange={(e) =>
                handleNestedChange("validation", "type", e.target.value)
              }
            >
              <option value="exact">Exact</option>
              <option value="contains">Contains</option>
              <option value="regex">Regex</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="validation-pattern">Pattern</label>
            <input
              id="validation-pattern"
              value={form.validation.pattern}
              onChange={(e) =>
                handleNestedChange("validation", "pattern", e.target.value)
              }
            />
          </div>
        </div>
      </fieldset>

      {/* Scoring */}
      <fieldset className={styles.fieldset}>
        <legend>Scoring</legend>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="score-base">Base Score</label>
            <input
              id="score-base"
              type="number"
              value={form.scoring.baseScore}
              onChange={(e) =>
                handleNestedChange("scoring", "baseScore", e.target.value)
              }
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="score-time">Time Bonus/sec</label>
            <input
              id="score-time"
              type="number"
              value={form.scoring.timeBonusPerSecond}
              onChange={(e) =>
                handleNestedChange(
                  "scoring",
                  "timeBonusPerSecond",
                  e.target.value
                )
              }
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="score-hint">Hint Penalty</label>
            <input
              id="score-hint"
              type="number"
              value={form.scoring.hintPenalty}
              onChange={(e) =>
                handleNestedChange("scoring", "hintPenalty", e.target.value)
              }
            />
          </div>
        </div>
      </fieldset>

      {/* Clues */}
      <fieldset className={styles.fieldset}>
        <legend>Clues</legend>
        {form.clues.map((clue, i) => (
          <div key={i} className={styles.arrayItem}>
            <input
              placeholder="Clue text"
              value={clue.text}
              onChange={(e) => handleClueChange(i, "text", e.target.value)}
              aria-label={`Clue ${i + 1} text`}
            />
            <input
              placeholder="Image URL"
              value={clue.image}
              onChange={(e) => handleClueChange(i, "image", e.target.value)}
              aria-label={`Clue ${i + 1} image`}
            />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => removeClue(i)}
              aria-label={`Remove clue ${i + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
        <button type="button" className={styles.addBtn} onClick={addClue}>
          + Add Clue
        </button>
      </fieldset>

      {/* Hints */}
      <fieldset className={styles.fieldset}>
        <legend>Hints</legend>
        {form.hints.map((hint, i) => (
          <div key={i} className={styles.arrayItem}>
            <input
              type="number"
              placeholder="Level"
              value={hint.level}
              onChange={(e) => handleHintChange(i, "level", e.target.value)}
              style={{ width: "60px" }}
              aria-label={`Hint ${i + 1} level`}
            />
            <input
              placeholder="Hint text"
              value={hint.text}
              onChange={(e) => handleHintChange(i, "text", e.target.value)}
              aria-label={`Hint ${i + 1} text`}
            />
            <input
              type="number"
              placeholder="Penalty"
              value={hint.penaltyScore}
              onChange={(e) =>
                handleHintChange(i, "penaltyScore", e.target.value)
              }
              style={{ width: "80px" }}
              aria-label={`Hint ${i + 1} penalty`}
            />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => removeHint(i)}
              aria-label={`Remove hint ${i + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
        <button type="button" className={styles.addBtn} onClick={addHint}>
          + Add Hint
        </button>
      </fieldset>

      <div className={styles.actions}>
        <Button type="submit">{initialData ? "Update" : "Create"}</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

export default PuzzleForm;
