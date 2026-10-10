
import { useState } from "react";
import { runQuantumAnalysis } from "./api";
import type { AnalysisResult } from "./api";

export default function RunAnalysis() {
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalysis() {
    setLoading(true);
    setError("");

    try {
      const result = await runQuantumAnalysis();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h2>Quantum Healthcare AI</h2>
      <p>
        Compare classical and quantum machine-learning models
        using synthetic research data.
      </p>

      <button onClick={handleAnalysis} disabled={loading}>
        {loading ? "Running analysis..." : "Run Analysis"}
      </button>

      {error && <p role="alert">{error}</p>}

      {data && (
        <section>
          <h3>Analysis Results</h3>
          <p>Execution: {data.execution}</p>
          <p>Dataset size: {data.dataset.total_samples}</p>

          <h4>Classical SVM</h4>
          <p>
            Accuracy: {(data.results.classical_svm.accuracy * 100).toFixed(2)}%
          </p>
          <p>
            F1 score: {data.results.classical_svm.f1_score.toFixed(3)}
          </p>

          <h4>Quantum SVC</h4>
          <p>
            Accuracy: {(data.results.quantum_svc.accuracy * 100).toFixed(2)}%
          </p>
          <p>
            F1 score: {data.results.quantum_svc.f1_score.toFixed(3)}
          </p>

          <p>{data.message}</p>
          <small>{data.privacy_note}</small>
        </section>
      )}
    </main>
  );
}
