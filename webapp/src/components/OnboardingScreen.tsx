import React, { useState } from "react";
import { OnboardingState } from "@/lib/types";

interface Step {
  id: keyof OnboardingState;
  title: string;
  options: { id: string; label: string }[];
  multi?: boolean;
}

const steps: Step[] = [
  {
    id: "room",
    title: "What room are you designing?",
    options: [
      { id: "kitchen", label: "Kitchen" },
      { id: "bathroom", label: "Bathroom" },
      { id: "living-room", label: "Living Room" },
    ],
  },
  {
    id: "budget",
    title: "What is your budget?",
    options: [
      { id: "low", label: "Low" },
      { id: "medium", label: "Medium" },
      { id: "high", label: "High" },
    ],
  },
  {
    id: "styles",
    title: "What style do you prefer?",
    multi: true,
    options: [
      { id: "modern", label: "Modern" },
      { id: "warm", label: "Warm" },
      { id: "minimal", label: "Minimal" },
      { id: "luxury", label: "Luxury" },
    ],
  },
  {
    id: "priority",
    title: "What matters most?",
    options: [
      { id: "cost", label: "Cost" },
      { id: "aesthetics", label: "Aesthetics" },
      { id: "durability", label: "Durability" },
      { id: "resale", label: "Resale Value" },
    ],
  },
];

export function OnboardingScreen({
  onComplete,
}: {
  onComplete: (data: OnboardingState) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingState>({
    room: "kitchen",
    budget: "",
    styles: [],
    priority: "",
  });

  const step = steps[currentStep];

  const handleSelect = (optionId: string) => {
    if (step.multi) {
      const currentStyles = [...answers.styles];
      const index = currentStyles.indexOf(optionId);
      if (index > -1) {
        currentStyles.splice(index, 1);
      } else {
        currentStyles.push(optionId);
      }
      setAnswers({ ...answers, styles: currentStyles });
    } else {
      const newAnswers = { ...answers, [step.id]: optionId };
      setAnswers(newAnswers);
      
      // Auto-advance for single select
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete(newAnswers);
      }
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  return (
    <main className="screen center onboarding-screen">
      <div className="onboarding-step">
        <p className="selection-label">Step {currentStep + 1} of {steps.length}</p>
        <h2 className="question-title">{step.title}</h2>
        
        <div className="options-grid">
          {step.options.map((opt) => (
            <div
              key={opt.id}
              className={`option-card ${
                step.multi
                  ? answers.styles.includes(opt.id) ? "selected" : ""
                  : answers[step.id] === opt.id ? "selected" : ""
              }`}
              onClick={() => handleSelect(opt.id)}
            >
              {opt.label}
            </div>
          ))}
        </div>

        {step.multi && (
          <div style={{ marginTop: "3rem" }}>
            <button className="btn-large" onClick={handleNext} disabled={answers.styles.length === 0}>
              Continue
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
