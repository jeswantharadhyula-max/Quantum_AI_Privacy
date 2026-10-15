
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import numpy as np

from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, f1_score

from qiskit.circuit.library import ZZFeatureMap
from qiskit_machine_learning.kernels import FidelityQuantumKernel
from qiskit_machine_learning.algorithms import QSVC


# ---------------------------------------
# 1. Create FastAPI application
# ---------------------------------------

app = FastAPI(
    title="Privacy-Preserving Quantum Healthcare AI",
    description="Quantum and classical ML research prototype",
    version="1.0.0",
)

# Change this origin if your Vite frontend uses another port.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


# ---------------------------------------
# 2. Request validation
# ---------------------------------------

class AnalysisRequest(BaseModel):
    test_size: float = Field(default=0.25, gt=0.1, lt=0.5)
    random_state: int = Field(default=42, ge=0, le=100000)
    privacy_mode: bool = True


# ---------------------------------------
# 3. Home endpoint
# ---------------------------------------

@app.get("/")
def home():
    return {
        "project": "Privacy-Preserving Quantum Healthcare AI",
        "status": "running",
        "documentation": "/docs",
    }


# ---------------------------------------
# 4. Health-check endpoint
# ---------------------------------------

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "backend": "FastAPI",
    }


# ---------------------------------------
# 5. Run ML analysis
# ---------------------------------------

@app.post("/api/run-demo")
def run_analysis(request: AnalysisRequest):

    try:
        # Generate synthetic data.
        # This is NOT real patient data.
        X, y = make_classification(
            n_samples=80,
            n_features=4,
            n_informative=3,
            n_redundant=0,
            n_classes=2,
            random_state=request.random_state,
        )

        # Split data into training and testing sets.
        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=request.test_size,
            random_state=request.random_state,
            stratify=y,
        )

        # Scale data using training data only.
        scaler = MinMaxScaler(
            feature_range=(0, np.pi)
        )

        X_train = scaler.fit_transform(X_train)
        X_test = scaler.transform(X_test)

        # ---------------------------------------
        # 5A. Classical machine-learning model
        # ---------------------------------------

        classical_model = SVC(kernel="rbf")

        classical_model.fit(X_train, y_train)

        classical_predictions = classical_model.predict(
            X_test
        )

        classical_results = {
            "accuracy": round(
                float(
                    accuracy_score(
                        y_test,
                        classical_predictions,
                    )
                ),
                4,
            ),
            "f1_score": round(
                float(
                    f1_score(
                        y_test,
                        classical_predictions,
                        zero_division=0,
                    )
                ),
                4,
            ),
        }

        # ---------------------------------------
        # 5B. Quantum feature map
        # ---------------------------------------

        feature_map = ZZFeatureMap(
            feature_dimension=4,
            reps=1,
            entanglement="linear",
        )

        # ---------------------------------------
        # 5C. Quantum fidelity kernel
        # ---------------------------------------

        quantum_kernel = FidelityQuantumKernel(
            feature_map=feature_map
        )

        # ---------------------------------------
        # 5D. Quantum SVC classifier
        # ---------------------------------------

        quantum_model = QSVC(
            quantum_kernel=quantum_kernel
        )

        quantum_model.fit(X_train, y_train)

        quantum_predictions = quantum_model.predict(
            X_test
        )

        quantum_results = {
            "accuracy": round(
                float(
                    accuracy_score(
                        y_test,
                        quantum_predictions,
                    )
                ),
                4,
            ),
            "f1_score": round(
                float(
                    f1_score(
                        y_test,
                        quantum_predictions,
                        zero_division=0,
                    )
                ),
                4,
            ),
        }

        # ---------------------------------------
        # 5E. Return results to frontend
        # ---------------------------------------

        return {
            "success": True,
            "project": "Privacy-Preserving Quantum Healthcare AI",
            "data_source": "synthetic_demo_data",
            "clinical_use": False,
            "execution": "local_quantum_simulator",
            "privacy_mode": request.privacy_mode,
            "privacy_note": (
                "Synthetic data only. The privacy_mode flag "
                "does not implement differential privacy."
            ),
            "dataset": {
                "total_samples": int(len(X)),
                "training_samples": int(len(X_train)),
                "testing_samples": int(len(X_test)),
                "features": int(X.shape[1]),
            },
            "results": {
                "classical_svm": classical_results,
                "quantum_svc": quantum_results,
            },
            "message": (
                "Analysis completed successfully. "
                "These results are experimental, not medical advice."
            ),
        }

    except Exception as exc:
        # Avoid exposing internal details to API clients.
        print(f"Analysis error: {exc}")
        raise HTTPException(
            status_code=500,
            detail="Analysis failed. Check the backend terminal.",
        ) from exc





