# Stacks Frontend

A modern, interactive web application built with Next.js, React, and TypeScript, featuring a medieval fantasy UI theme with engaging components like progress seals, stone tablets, and quest chambers.

## 🚀 Features

- **Next.js 13+** with App Router for optimal performance
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for utility-first styling
- **Modern UI Components** including:
  - Progress Seals for tracking achievements
  - Stone Tablets for displaying important information
  - Quest Chambers for interactive challenges
  - Engraved Letters for stylized text
  - Responsive design for all device sizes
- **Theme Support** with light/dark mode
- **Interactive Elements** with smooth animations
- **Form Handling** with validation
- **Accessibility** focused components

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.10
- **UI**: React 19, Tailwind CSS
- **Language**: TypeScript
- **Build Tool**: Turbopack (Next.js default)
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Version Control**: Git

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.17 or later
- npm (included with Node.js) or yarn/pnpm
- Git

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/stacks-frontend.git
   cd stacks-frontend/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## 🏗️ Project Structure

```
frontend/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   ├── progress-seal.tsx # Progress tracking component
│   ├── stone-tablet.tsx # Styled information display
│   ├── quest-chamber.tsx # Interactive challenge component
│   └── ...
├── app/                 # Next.js 13+ App Router
│   ├── page.tsx         # Home page
│   └── ...
├── public/              # Static files
├── styles/              # Global styles
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── ...
```

## 🎨 Theming

This project uses a custom theme system with light and dark mode support. The theming is implemented using CSS variables and can be easily extended.

### Available Themes

- **Light**: Default theme with light colors
- **Dark**: Dark theme for reduced eye strain

To toggle between themes, use the theme toggle component in the application.

## 🧪 Testing

Run the test suite with:

```bash
npm test
# or
yarn test
# or
pnpm test
```

## 🧹 Linting

This project uses ESLint for code quality. To run the linter:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

To start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

## 📚 Documentation

For more information about the components and their usage, refer to the [documentation](https://your-docs-url.com).

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the awesome React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the component inspiration
- All the open-source contributors who made this project possible

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
