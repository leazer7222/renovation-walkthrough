export function ProgressBar({ 
  current, 
  total, 
  subProgress, 
  phaseLabel 
}: { 
  current: number; 
  total: number; 
  subProgress?: number; 
  phaseLabel?: string;
}) {
  const percent = (current / total) * 100;
  return (
    <div className="progress-bar">
      <div className="progress-text">
        <span>Step {current} of {total}: Choose your {phaseLabel?.toLowerCase()}</span>
        {subProgress !== undefined && <span>{subProgress} choices remaining</span>}
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

