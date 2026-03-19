const ProgressBar = ({ currentStep, totalSteps, labels }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="small text-uppercase fw-bold text-primary">
          Step {currentStep + 1} of {totalSteps}
        </div>
        <div className="small text-muted">{labels[currentStep]}</div>
      </div>
      <div className="progress mb-3" style={{ height: "10px" }}>
        <div
          className="progress-bar bg-info"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      <div className="d-flex flex-wrap gap-2">
        {labels.map((label, index) => (
          <span
            key={label}
            className={`badge rounded-pill px-3 py-2 ${
              index <= currentStep
                ? "text-bg-primary"
                : "text-bg-light border text-muted"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
