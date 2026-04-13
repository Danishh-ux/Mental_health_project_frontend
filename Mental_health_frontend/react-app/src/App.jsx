import { useState } from "react";

const defaultValues = {
  Age: 28,
  work_interfere_ordered: 2,
  us_resident: 1,
  benefits_num: 2,
  wellness_program_num: 1,
  seek_help_num: 1,
  anonymity_num: 1,
  leave_ordered: 2,
  no_employees_ordered: 2,
  family_history_num: 1,
  self_employed_num: 0,
  gender_numeric: 1,
  care_options_numeric: 1,
  phys_health_consequence_num: 1,
};

const styles = {
  container: { 
    minHeight: "100vh", 
    padding: "3rem 1rem", 
    display: "flex", 
    justifyContent: "center",
    alignItems: "flex-start"
  },
  shell: { 
    width: "100%", 
    maxWidth: 760, 
    background: "#ffffff", 
    padding: "2.5rem", 
    borderRadius: "16px", 
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)" 
  },
  header: { 
    marginBottom: "2rem",
    paddingBottom: "1.5rem",
    borderBottom: "1px solid #f1f5f9"
  },
  h1: { 
    fontSize: 26, 
    fontWeight: 700, 
    color: "#0f172a", 
    margin: 0,
    letterSpacing: "-0.02em"
  },
  subtext: { 
    fontSize: 15, 
    color: "#64748b", 
    marginTop: 8, 
    lineHeight: 1.5 
  },
  sectionLabel: {
    fontSize: 12, 
    fontWeight: 600, 
    textTransform: "uppercase",
    letterSpacing: "0.05em", 
    color: "#64748b", 
    margin: "2rem 0 1rem",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  grid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
    gap: "1rem" 
  },
  field: { 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "space-between",
    height: "100%",                
    gap: 6 
  },
  label: { 
    fontSize: 13, 
    fontWeight: 500, 
    color: "#334155" 
  },
  urlRow: { 
    display: "flex", 
    gap: 12, 
    alignItems: "center",
    background: "#f8fafc",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0"
  },
  tag: {
    fontSize: 12, 
    fontWeight: 600,
    background: "#e0e7ff", 
    borderRadius: 6, 
    padding: "6px 10px", 
    color: "#4f46e5", 
    whiteSpace: "nowrap",
  },
  btn: {
    marginTop: "2.5rem", 
    width: "100%", 
    height: 48, 
    borderRadius: "10px",
    fontSize: 16, 
    fontWeight: 600, 
    color: "#ffffff",
    border: "none",
    background: "#4f46e5",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.2)"
  },
  btnDisabled: { 
    opacity: 0.6, 
    cursor: "not-allowed",
    boxShadow: "none"
  },
  resultPositive: {
    marginTop: "2rem", padding: "1.5rem", borderRadius: 12,
    background: "#f0fdf4", border: "1px solid #bbf7d0",
  },
  resultNegative: {
    marginTop: "2rem", padding: "1.5rem", borderRadius: 12,
    background: "#fef2f2", border: "1px solid #fecaca",
  },
  resultLabelPositive: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#166534" },
  resultLabelNegative: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#991b1b" },
  resultValuePositive: { fontSize: 24, fontWeight: 600, marginTop: 8, color: "#15803d" },
  resultValueNegative: { fontSize: 24, fontWeight: 600, marginTop: 8, color: "#b91c1c" },
  resultSubPositive: { fontSize: 14, marginTop: 8, color: "#166534", lineHeight: 1.5 },
  resultSubNegative: { fontSize: 14, marginTop: 8, color: "#991b1b", lineHeight: 1.5 },
  errorBox: {
    marginTop: "2rem", padding: "1.25rem", borderRadius: 12,
    background: "#fff1f2", border: "1px solid #ffe4e6", color: "#be123c", fontSize: 14,
  },
};

function Field({ label, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

export default function App() {
const [apiUrl, setApiUrl] = useState("https://danishh-ux-mental-hea-frontnd.hf.space/predict");
  const [form, setForm] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: parseFloat(value) }));

  const predict = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server returned ${res.status}: ${txt}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const needsTreatment = result?.needs_treatment === 1;

  return (
    <div style={styles.container}>
      {/* Global styles for things inline CSS can't handle well like body background, focus states, and hovers */}
      <style>{`
        body { 
          background-color: #f8fafc; 
          margin: 0; 
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
        }
        .modern-input {
          height: 40px;
          border-radius: 8px;
          font-size: 14px;
          border: 1px solid #cbd5e1;
          padding: 0 12px;
          width: 100%;
          box-sizing: border-box;
          background: #ffffff;
          color: #0f172a;
          transition: all 0.15s ease;
        }
        .modern-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .modern-btn:hover:not(:disabled) {
          background-color: #4338ca !important;
          transform: translateY(-1px);
        }
        .modern-btn:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>

      <div style={styles.shell}>
        <div style={styles.header}>
          <h1 style={styles.h1}>Mental Health Treatment Predictor</h1>
          <p style={styles.subtext}>
            Adjust the features below to query the Random Forest model. Ensure your FastAPI backend is running before testing.
          </p>
        </div>

        <div style={styles.sectionLabel}>
          <span>⚙️</span> API Configuration
        </div>
        <div style={styles.urlRow}>
          <span style={styles.tag}>POST</span>
          <input
            className="modern-input"
            style={{ flex: 1, border: "none", background: "transparent", boxShadow: "none", padding: 0 }}
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </div>

        <div style={styles.sectionLabel}>
          <span>👤</span> Demographics & History
        </div>
        <div style={styles.grid}>
          <Field label="Age">
            <input className="modern-input" type="number" min={10} max={100}
              value={form.Age} onChange={(e) => set("Age", e.target.value)} />
          </Field>
          <Field label="Gender">
            <select className="modern-input" value={form.gender_numeric}
              onChange={(e) => set("gender_numeric", e.target.value)}>
              <option value={0}>Female</option>
              <option value={1}>Male</option>
              <option value={2}>Other</option>
            </select>
          </Field>
          <Field label="US Resident?">
            <select className="modern-input" value={form.us_resident}
              onChange={(e) => set("us_resident", e.target.value)}>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </Field>
          <Field label="Family History of Mental Illness">
            <select className="modern-input" value={form.family_history_num}
              onChange={(e) => set("family_history_num", e.target.value)}>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </Field>
          <Field label="Self-Employed">
            <select className="modern-input" value={form.self_employed_num}
              onChange={(e) => set("self_employed_num", e.target.value)}>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </Field>
        </div>

        <div style={styles.sectionLabel}>
          <span>🏢</span> Workplace Conditions
        </div>
        <div style={styles.grid}>
          {/* UPDATED FIELD: Work Interference */}
          <Field label="Does your mental health interfere with work?">
            <select className="modern-input" value={form.work_interfere_ordered}
              onChange={(e) => set("work_interfere_ordered", e.target.value)}>
              <option value={0}>Never</option>
              <option value={1}>Rarely</option>
              <option value={2}>Sometimes</option>
              <option value={3}>Often</option>
              <option value={4}>Always / N/A</option>
            </select>
          </Field>

          <Field label="Company Size">
            <select className="modern-input" value={form.no_employees_ordered}
              onChange={(e) => set("no_employees_ordered", e.target.value)}>
              <option value={0}>1–5</option>
              <option value={1}>6–25</option>
              <option value={2}>26–100</option>
              <option value={3}>100–500</option>
              <option value={4}>500–1000</option>
              <option value={5}>1000+</option>
            </select>
          </Field>
          <Field label="Mental Health Benefits">
            <select className="modern-input" value={form.benefits_num}
              onChange={(e) => set("benefits_num", e.target.value)}>
              <option value={0}>No</option>
              <option value={1}>Don't know</option>
              <option value={2}>Yes</option>
            </select>
          </Field>
          <Field label="Wellness Program">
            <select className="modern-input" value={form.wellness_program_num}
              onChange={(e) => set("wellness_program_num", e.target.value)}>
              <option value={0}>No</option>
              <option value={1}>Don't know</option>
              <option value={2}>Yes</option>
            </select>
          </Field>
          <Field label="Seek Help Resources">
            <select className="modern-input" value={form.seek_help_num}
              onChange={(e) => set("seek_help_num", e.target.value)}>
              <option value={0}>No</option>
              <option value={1}>Don't know</option>
              <option value={2}>Yes</option>
            </select>
          </Field>
          <Field label="Anonymity Protected">
            <select className="modern-input" value={form.anonymity_num}
              onChange={(e) => set("anonymity_num", e.target.value)}>
              <option value={0}>No</option>
              <option value={1}>Don't know</option>
              <option value={2}>Yes</option>
            </select>
          </Field>

          {/* UPDATED FIELD: Leave Ease */}
          <Field label="How easy is it to take medical leave?">
            <select className="modern-input" value={form.leave_ordered}
              onChange={(e) => set("leave_ordered", e.target.value)}>
              <option value={0}>Very Difficult</option>
              <option value={1}>Somewhat Difficult</option>
              <option value={2}>Don't Know</option>
              <option value={3}>Somewhat Easy</option>
              <option value={4}>Very Easy</option>
            </select>
          </Field>

          <Field label="Care Options Awareness">
            <select className="modern-input" value={form.care_options_numeric}
              onChange={(e) => set("care_options_numeric", e.target.value)}>
              <option value={0}>No</option>
              <option value={1}>Not sure</option>
              <option value={2}>Yes</option>
            </select>
          </Field>
          <Field label="Physical Health Concern">
            <select className="modern-input" value={form.phys_health_consequence_num}
              onChange={(e) => set("phys_health_consequence_num", e.target.value)}>
              <option value={0}>No</option>
              <option value={1}>Maybe</option>
              <option value={2}>Yes</option>
            </select>
          </Field>
        </div>

        <button
          className="modern-btn"
          style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}
          onClick={predict}
          disabled={loading}
        >
          {loading ? "Running Prediction Pipeline..." : "Run Prediction"}
        </button>

        {result && (
          <div style={needsTreatment ? styles.resultNegative : styles.resultPositive}>
            <div style={needsTreatment ? styles.resultLabelNegative : styles.resultLabelPositive}>
              Model Prediction Output
            </div>
            <div style={needsTreatment ? styles.resultValueNegative : styles.resultValuePositive}>
              {needsTreatment ? "Treatment Recommended" : "No Treatment Indicated"}
            </div>
            <div style={needsTreatment ? styles.resultSubNegative : styles.resultSubPositive}>
              {needsTreatment
                ? "The Random Forest classifier suggests this profile aligns with individuals who seek mental health treatment based on historical data."
                : "The Random Forest classifier does not indicate an immediate statistical probability for mental health treatment."}
            </div>
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>
            <strong>Connection Failed:</strong> {error}
            <div style={{ fontSize: 13, marginTop: 8, opacity: 0.9 }}>
              Verify that your FastAPI container/server is running locally and that CORS origins include your frontend port.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
