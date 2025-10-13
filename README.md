# 🌟 Admin Rumor Portal

> _The future of experience discovery and management - making valuable connections remarkably simple._

## 📖 About Rumor

Rumor is a **members-only experience discovery and RSVP management platform** that connects a curated community with renowned hosts of coveted cultural moments. Our platform bridges the gap between exclusive experiences and influential individuals through sophisticated technology and elegant design.

### ✨ Key Features

**For Members:**

- 🎭 **Curated Experience Discovery** - Access to year-round lifestyle calendar with high-profile public and invite-only experiences
- 🔐 **Exclusive Community Access** - Rigorous approval process ensures a diverse, influential member base
- 💬 **Direct Host Communication** - Chat directly with event hosts and experience creators
- 🎫 **Digital Entry Management** - Seamless RSVP tracking and digital pass management
- 📱 **Social Integration** - Instagram authentication for identity verification and profile enrichment

**For Hosts:**

- 📊 **Comprehensive Analytics** - Detailed insights on social posts, engagement metrics, and audience demographics
- 👥 **Advanced Guest Management** - Effortless event creation, customization, and guest list management
- 💰 **Integrated Payment System** - Direct compensation negotiation, contract signing, and payment processing
- 🎯 **Marketing Optimization** - Data-driven insights to refine event marketing strategies
- 📈 **Impact Tracking** - Real-time RSVP tracking and event performance metrics

## 🚀 Tech Stack

This project leverages cutting-edge technologies for optimal performance and developer experience:

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript 5.2](https://www.typescriptlang.org/) with strict mode
- **Package Manager:** [pnpm 8+](https://pnpm.io/) for efficient dependency management
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) for utility-first styling
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components
- **Icons:** [Lucide React](https://lucide.dev/) for consistent iconography
- **Development:** [Turbopack](https://turbo.build/pack) for lightning-fast builds

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js 18+** (LTS recommended)
- **pnpm 8+** (preferred package manager for this project)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/chriscampbellt/admin-rumor-portal.git
   cd admin-rumor-portal
   ```

2. **Install pnpm globally** (if not already installed)

   ```bash
   npm install -g pnpm
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## 📁 Project Structure

```
rumor-portal/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── features/       # Feature-specific components
│   │   └── layout/         # Layout components
│   ├── lib/
│   │   ├── utils.ts        # Utility functions
│   │   └── validations.ts  # Form validations
│   └── types/
│       └── index.ts        # TypeScript definitions
├── public/                 # Static assets
├── components.json         # shadcn/ui configuration
└── tailwind.config.ts     # Tailwind CSS configuration
```

## 🎨 Design System

Admin Rumor Portal features a modern, accessible design system built with:

- **Color Palette:** Carefully crafted color scheme with proper contrast ratios
- **Typography:** Geist font family optimized for readability
- **Components:** Consistent, reusable UI components via shadcn/ui
- **Responsive Design:** Mobile-first approach ensuring excellent UX across devices

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality
- `pnpm type-check` - Run TypeScript type checking

### Code Quality

This project maintains high code quality through:

- **TypeScript** - Static type checking and enhanced IDE support
- **ESLint** - Consistent code style and best practices
- **Prettier** - Automated code formatting
- **Husky** - Git hooks for pre-commit quality checks

### Development Guidelines

- Follow the existing code style and patterns
- Write meaningful commit messages using conventional commits
- Add tests for new features when applicable
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the incredible framework
- [Vercel](https://vercel.com/) for seamless deployment platform
- [shadcn](https://twitter.com/shadcn) for the beautiful UI component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<div align="center">

**[🌐 Live Demo](https://rumor-portal.vercel.app)** | **[📚 Documentation](https://docs.rumor-portal.com)** | **[🐛 Report Bug](https://github.com/your-username/rumor-portal/issues)** | **[✨ Request Feature](https://github.com/your-username/rumor-portal/issues)**

Made with ❤️ for the future of experience discovery

</div>
