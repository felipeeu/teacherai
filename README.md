# TeacherAI

TeacherAI is a web application built with Next.js, React and TypeScript to support educational workflows using generative AI.

The project explores how AI can assist teachers in creating and adapting educational content based on subjects, school levels, competencies and learning goals.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- React Hook Form
- Jest
- Google Generative AI API

## Main Features

- Generate educational questions with AI
- Adapt questions for different learning contexts
- Validate generated questions
- Generate competency and skill descriptions
- Work with BNCC-related educational data
- Select school level, subject and skills through reusable form components
- Render AI-generated structured content in the interface

## Project Structure

The application uses the Next.js App Router.

```text
app/
├── api/
│   ├── (bncc)/
│   └── (question)/
│
├── bncc/
│   └── (creation)/
│
├── lib/
│   ├── prompts/
│   ├── json/
│   └── data.ts
│
└── utils/

components/
├── CompetencySelector/
├── Select/
├── SkillSelector/
└── ui/
