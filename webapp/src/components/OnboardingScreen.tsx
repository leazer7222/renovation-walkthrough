import React, { useState } from "react";
import { OnboardingState } from "@/lib/types";

interface Option {
  label: string;
  description: string;
  value: string;
}

interface Step {
  id: keyof OnboardingState;
  stepLabel: string;
  title: string;
  subtitle: string;
  options: Option[];
  multi?: boolean;
}

const steps: Step[] = [
  {
    id: "room",
    stepLabel: "Getting Started",
    title: "What space are you working on?",
    subtitle: "We'll tailor your options based on the room you're designing.",
    options: [
      { label: "Kitchen", description: "Cabinets, countertops, flooring", value: "kitchen" },
      { label: "Bathroom", description: "Tile, vanities, fixtures", value: "bathroom" },
      { label: "Living Room", description: "Flooring, finishes, layout", value: "living-room" },
    ],
  },
  {
    id: "budget",
    stepLabel: "Budget",
    title: "What's your budget range?",
    subtitle: "This helps us show options that match your price point.",
    options: [
      { label: "Budget-Friendly", description: "Cost-conscious options", value: "low" },
      { label: "Mid-Range", description: "Balanced quality and cost", value: "medium" },
      { label: "Premium", description: "High-end materials and finishes", value: "high" },
    ],
  },
  {
    id: "styles",
    stepLabel: "Style",
    title: "What style do you prefer?",
    subtitle: "Select one or more styles that inspire you.",
    multi: true,
    options: [
      { label: "Modern", description: "Clean lines and bold contrast", value: "modern" },
      { label: "Warm", description: "Natural wood and soft tones", value: "warm" },
      { label: "Minimal", description: "Simple, uncluttered spaces", value: "minimal" },
      { label: "Luxury", description: "High-end finishes and detail", value: "luxury" },
    ],
  },
  {
    id: "priority",
    stepLabel: "Priorities",
    title: "What's your top priority?",
    subtitle: "We'll prioritize options based on what matters most to you.",
    options: [
      { label: "Cost", description: "Stay within budget", value: "cost" },
      { label: "Aesthetics", description: "Look and design", value: "aesthetics" },
      { label: "Durability", description: "Long-lasting materials", value: "durability" },
      { label: "Resale Value", description: "Maximize home value", value: "resale" },
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

  const handleSelect = (optionValue: string) => {
    if (step.multi) {
      const currentStyles = [...answers.styles];
      const index = currentStyles.indexOf(optionValue);
      if (index > -1) {
        currentStyles.splice(index, 1);
      } else {
        currentStyles.push(optionValue);
      }
      setAnswers({ ...answers, styles: currentStyles });
    } else {
      const newAnswers = { ...answers, [step.id]: optionValue };
      setAnswers(newAnswers);
      
      // Auto-advance for single select
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete(newAnswers);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const canContinue = step.multi ? answers.styles.length > 0 : !!answers[step.id];

  return (
    <main className="screen center onboarding-screen">
      <div className="onboarding-step">
        <header className="onboarding-header">
          <p className="step-indicator">
            Step {currentStep + 1} of {steps.length} — {step.stepLabel}
          </p>
          <h2 className="question-title">{step.title}</h2>
          <p className="question-subtitle">{step.subtitle}</p>
        </header>
        
        <div className="options-grid">
          {step.options.map((opt) => (
            <div
              key={opt.value}
              className={`option-card ${
                step.multi
                  ? answers.styles.includes(opt.value) ? "selected" : ""
                  : answers[step.id] === opt.value ? "selected" : ""
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              <div className="option-label">{opt.label}</div>
              <div className="option-description">{opt.description}</div>
            </div>
          ))}
        </div>

        <div className="onboarding-nav">
          {currentStep > 0 && (
            <button className="btn-secondary" onClick={handleBack}>
              Back
            </button>
          )}
          {step.multi && (
            <button 
              className="btn-large" 
              onClick={handleNext} 
              disabled={!canContinue}
            >
              Continue
            </button>
          )}
        </div>
      </div>

      <footer className="onboarding-footer">
        <p className="speed-reinforcement">Takes less than 2 minutes</p>
      </footer>
    </main>
  );
}

