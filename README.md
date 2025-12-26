# Prescription Analyzer

A React-based web application that uses AI to analyze medical prescriptions and find alternative medications.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)
![Vite](https://img.shields.io/badge/Vite-4.x-646cff)

## Features

- **Upload Prescription Images** - Support for JPG, PNG, JPEG, WebP,
- **AI-Powered Analysis** - Extract patient info, medications, dosage, and more
- **Find Alternatives** - Get generic and branded medicine alternatives with pricing
- **Modern UI** - Beautiful gradient design with responsive layout
- **MVC Architecture** - Clean, maintainable code structure

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd prescription-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## How to Use

1. **Upload a Prescription** - Click or drag & drop a prescription image
2. **Analyze** - Click "Analyze Prescription" button
3. **View Results** - See extracted information in a beautiful modal
4. **Find Alternatives** - Click "Find Alternatives" for any medication

## Project Structure

```
prescription-analyzer/
├── src/
│   ├── models/              # Data structures
│   ├── controllers/         # Business logic
│   ├── services/            # API integration
│   ├── views/
│   │   ├── components/      # Reusable UI components
│   │   └── pages/           # Page components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   └── constants/           # App constants
├── public/                  # Static assets
├── .env.local              # Environment variables (create this)
└── package.json
```

## Built With

- **React** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Gemini AI** - AI analysis

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Gemini API key | Yes |

## Common Issues

### API Key Error
**Problem:** "API key is not configured"

**Solution:** 
1. Create `.env.local` file
2. Add your API key
3. Restart dev server

### Styling Not Working
**Problem:** Tailwind classes not applying

**Solution:**
```bash
npm run dev
```
Then hard refresh browser: `Ctrl+Shift+R`

### Module Errors
**Problem:** "Cannot find module"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Gemini AI for providing the AI analysis API
- React community for excellent documentation
- All contributors who help improve this project