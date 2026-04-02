# CLAUDE.md - AI Development Guidelines

## Project Context

This is a scaffold for ReformAI's renovation guidance system. Focus on clean, modular architecture that supports visual decision-making flows.

## Core Rules

### 1. Simplicity First
- Prefer simple solutions over complex abstractions
- Keep code readable and maintainable
- Avoid over-engineering

### 2. Visual-Centric Design
- All user interactions should be visual comparisons
- Single variable changes per decision
- Room context is critical for meaningful choices

### 3. Data Structure Integrity
- Maintain room × style matrix organization
- Use slugs for programmatic access
- Preserve original names for display

### 4. Mock Data Philosophy
- Create realistic but minimal examples
- Focus on structure over comprehensive coverage
- Use placeholders liberally

## Development Guidelines

### File Organization
- Keep related functionality together
- Use clear, descriptive names
- Follow existing directory structure

### Code Style
- Clean, readable Python/JavaScript
- Consistent naming conventions
- Minimal dependencies

### Asset Management
- Reference assets by path, not embed
- Use consistent naming patterns
- Maintain separation between base/ref/thumbnail assets

## Future Considerations

### When Adding Features
- Ensure visual comparisons remain core interaction
- Maintain room context for all decisions
- Keep decision fatigue management in mind

### When Expanding Data
- Follow existing Excel extraction patterns
- Update manifests automatically
- Maintain backward compatibility

### When Building UI
- Prioritize visual clarity
- Support quick A/B comparisons
- Minimize cognitive load

## Quality Checks

Before committing changes:
- Does this maintain visual-centric approach?
- Is the code simple and readable?
- Does it follow existing patterns?
- Are data structures preserved?

## Contact

For questions about architectural decisions or design philosophy, reference the core principles in this document and the README.md.