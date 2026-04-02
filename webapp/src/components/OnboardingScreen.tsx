import React, { useState } from "react";
import { OnboardingState } from "@/lib/types";

interface Option {
  label: string;
  description: string;
  value: string;
  image?: string;
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
    title: "Pick 3 styles that inspire you.",
    subtitle: "Your selections will shape the look and feel of your renovation.",
    multi: true,
    options: [
      { label: "Biophilic", description: "Nature-inspired elements", value: "biophilic", image: "/visualization-library/comparison/kitchen/prototype/Styles/Biophilic.png" },
      { label: "Bohemian", description: "Eclectic and free-spirited", value: "bohemian", image: "/visualization-library/comparison/kitchen/prototype/Styles/Bohemian.png" },
      { label: "Coastal", description: "Breezy, light, and airy", value: "coastal", image: "/visualization-library/comparison/kitchen/prototype/Styles/Coastal.png" },
      { label: "Contemporary", description: "Current, curated, and refined", value: "contemporary", image: "/visualization-library/comparison/kitchen/prototype/Styles/Contemporary .png" },
      { label: "Farmhouse", description: "Warm, rustic, and welcoming", value: "farmhouse", image: "/visualization-library/comparison/kitchen/prototype/Styles/Farmhouse.png" },
      { label: "French Country", description: "Elegant and pastoral charm", value: "french-country", image: "/visualization-library/comparison/kitchen/prototype/Styles/French Country.png" },
      { label: "Industrial", description: "Raw materials and edge", value: "industrial", image: "/visualization-library/comparison/kitchen/prototype/Styles/Industrial.png" },
      { label: "Japandi", description: "Japanese-Scandi minimalism", value: "japandi", image: "/visualization-library/comparison/kitchen/prototype/Styles/Japandi.png" },
      { label: "Japanese", description: "Serene, ordered, and natural", value: "japanese", image: "/visualization-library/comparison/kitchen/prototype/Styles/Japanese.png" },
      { label: "Midcentury Modern", description: "Retro lines and warmth", value: "midcentury-modern", image: "/visualization-library/comparison/kitchen/prototype/Styles/Midcentury_modern.png" },
      { label: "Minimalist", description: "Less is more", value: "minimalist", image: "/visualization-library/comparison/kitchen/prototype/Styles/Minimalist.png" },
      { label: "Modern", description: "Clean lines and bold contrast", value: "modern", image: "/visualization-library/comparison/kitchen/prototype/Styles/Modern.png" },
      { label: "Neoclassic", description: "Timeless elegance reimagined", value: "neoclassic", image: "/visualization-library/comparison/kitchen/prototype/Styles/Neoclassic.png" },
      { label: "Rustic", description: "Earthy, natural, and textured", value: "rustic", image: "/visualization-library/comparison/kitchen/prototype/Styles/Rustic.png" },
      { label: "Vintage", description: "Nostalgic and characterful", value: "vintage", image: "/visualization-library/comparison/kitchen/prototype/Styles/Vintage.png" },
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

  const MAX_STYLES = 3;

  const handleSelect = (optionValue: string) => {
    if (step.multi) {
      const currentStyles = [...answers.styles];
      const index = currentStyles.indexOf(optionValue);
      if (index > -1) {
        currentStyles.splice(index, 1);
      } else {
        if (currentStyles.length >= MAX_STYLES) return;
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

  const canContinue = step.multi ? answers.styles.length === MAX_STYLES : !!answers[step.id];

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
        
        {step.multi && (
          <p className="style-selection-count">
            {answers.styles.length} / {MAX_STYLES} selected
          </p>
        )}
        <div className={step.multi ? "styles-grid" : "options-grid"}>
          {step.options.map((opt) => {
            const isSelected = step.multi
              ? answers.styles.includes(opt.value)
              : answers[step.id] === opt.value;
            const isDisabled = step.multi && !isSelected && answers.styles.length >= MAX_STYLES;
            return opt.image ? (
              <div
                key={opt.value}
                className={`style-card ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                onClick={() => !isDisabled && handleSelect(opt.value)}
              >
                <div className="style-card-image-wrap">
                  <img src={opt.image} alt={opt.label} />
                  {isSelected && <div className="style-card-check">✓</div>}
                </div>
                <div className="style-card-label">{opt.label}</div>
              </div>
            ) : (
              <div
                key={opt.value}
                className={`option-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelect(opt.value)}
              >
                <div className="option-label">{opt.label}</div>
                <div className="option-description">{opt.description}</div>
              </div>
            );
          })}
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
              {canContinue ? "Continue" : `Select ${MAX_STYLES - answers.styles.length} more`}
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

