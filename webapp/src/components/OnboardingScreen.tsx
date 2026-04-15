import React, { useState } from "react";
import { OnboardingState } from "@/lib/types";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Translations } from "@/i18n/translations";

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

function buildSteps(t: Translations): Step[] {
  return [
    {
      id: "room",
      stepLabel: t.roomStepLabel,
      title: t.roomTitle,
      subtitle: t.roomSubtitle,
      options: [
        { label: t.kitchen, description: t.kitchenDesc, value: "kitchen" },
        { label: t.bathroom, description: t.bathroomDesc, value: "bathroom" },
        { label: t.livingRoom, description: t.livingRoomDesc, value: "living-room" },
      ],
    },
    {
      id: "budget",
      stepLabel: t.budgetStepLabel,
      title: t.budgetTitle,
      subtitle: t.budgetSubtitle,
      options: [
        { label: t.budgetLow, description: t.budgetLowDesc, value: "low" },
        { label: t.budgetMedium, description: t.budgetMediumDesc, value: "medium" },
        { label: t.budgetHigh, description: t.budgetHighDesc, value: "high" },
      ],
    },
    {
      id: "styles",
      stepLabel: t.stylesStepLabel,
      title: t.stylesTitle,
      subtitle: t.stylesSubtitle,
      multi: true,
      options: [
        { label: "Biophilic", description: t.styleDescriptions["biophilic"], value: "biophilic", image: "/visualization-library/comparison/kitchen/prototype/Styles/Biophilic.png" },
        { label: "Bohemian", description: t.styleDescriptions["bohemian"], value: "bohemian", image: "/visualization-library/comparison/kitchen/prototype/Styles/Bohemian.png" },
        { label: "Coastal", description: t.styleDescriptions["coastal"], value: "coastal", image: "/visualization-library/comparison/kitchen/prototype/Styles/Coastal.png" },
        { label: "Contemporary", description: t.styleDescriptions["contemporary"], value: "contemporary", image: "/visualization-library/comparison/kitchen/prototype/Styles/Contemporary.png" },
        { label: "Farmhouse", description: t.styleDescriptions["farmhouse"], value: "farmhouse", image: "/visualization-library/comparison/kitchen/prototype/Styles/Farmhouse.png" },
        { label: "French Country", description: t.styleDescriptions["french-country"], value: "french-country", image: "/visualization-library/comparison/kitchen/prototype/Styles/French Country.png" },
        { label: "Industrial", description: t.styleDescriptions["industrial"], value: "industrial", image: "/visualization-library/comparison/kitchen/prototype/Styles/Industrial.png" },
        { label: "Japandi", description: t.styleDescriptions["japandi"], value: "japandi", image: "/visualization-library/comparison/kitchen/prototype/Styles/Japandi.png" },
        { label: "Japanese", description: t.styleDescriptions["japanese"], value: "japanese", image: "/visualization-library/comparison/kitchen/prototype/Styles/Japanese.png" },
        { label: "Midcentury Modern", description: t.styleDescriptions["midcentury-modern"], value: "midcentury-modern", image: "/visualization-library/comparison/kitchen/prototype/Styles/Midcentury-Modern.png" },
        { label: "Minimalist", description: t.styleDescriptions["minimalist"], value: "minimalist", image: "/visualization-library/comparison/kitchen/prototype/Styles/Minimalist.png" },
        { label: "Modern", description: t.styleDescriptions["modern"], value: "modern", image: "/visualization-library/comparison/kitchen/prototype/Styles/Modern.png" },
        { label: "Neoclassic", description: t.styleDescriptions["neoclassic"], value: "neoclassic", image: "/visualization-library/comparison/kitchen/prototype/Styles/Neoclassic.png" },
        { label: "Rustic", description: t.styleDescriptions["rustic"], value: "rustic", image: "/visualization-library/comparison/kitchen/prototype/Styles/Rustic.png" },
        { label: "Vintage", description: t.styleDescriptions["vintage"], value: "vintage", image: "/visualization-library/comparison/kitchen/prototype/Styles/Vintage.png" },
      ],
    },
    {
      id: "priority",
      stepLabel: t.priorityStepLabel,
      title: t.priorityTitle,
      subtitle: t.prioritySubtitle,
      options: [
        { label: t.priorityCost, description: t.priorityCostDesc, value: "cost" },
        { label: t.priorityAesthetics, description: t.priorityAestheticsDesc, value: "aesthetics" },
        { label: t.priorityDurability, description: t.priorityDurabilityDesc, value: "durability" },
        { label: t.priorityResale, description: t.priorityResaleDesc, value: "resale" },
      ],
    },
  ];
}

export function OnboardingScreen({
  onComplete,
  initialStyles = [],
}: {
  onComplete: (data: OnboardingState) => void;
  initialStyles?: string[];
}) {
  const { t } = useLanguage();
  const steps = buildSteps(t);
  const filteredSteps = initialStyles.length > 0
    ? steps.filter(s => s.id !== "styles")
    : steps;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingState>({
    room: "kitchen",
    budget: "",
    styles: initialStyles,
    priority: "",
  });

  const step = filteredSteps[currentStep];

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

      if (currentStep < filteredSteps.length - 1) {
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
    if (currentStep < filteredSteps.length - 1) {
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
            {t.stepOf(currentStep + 1, filteredSteps.length, step.stepLabel)}
          </p>
          <h2 className="question-title">{step.title}</h2>
          <p className="question-subtitle">{step.subtitle}</p>
        </header>

        {step.multi && (
          <p className="style-selection-count">
            {t.xOfYSelected(answers.styles.length, MAX_STYLES)}
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
              {t.back}
            </button>
          )}
          {step.multi && (
            <button
              className="btn-large"
              onClick={handleNext}
              disabled={!canContinue}
            >
              {canContinue ? t.continue : t.selectNMore(MAX_STYLES - answers.styles.length)}
            </button>
          )}
        </div>
      </div>

      <footer className="onboarding-footer">
        <p className="speed-reinforcement">{t.takesLessThan2Min}</p>
      </footer>
    </main>
  );
}
