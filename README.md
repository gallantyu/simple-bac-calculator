# Simple BAC Calculator

A lightweight, open-source Blood Alcohol Content (BAC) calculator built with React and TypeScript.

> 💡 **Looking for a more comprehensive solution?** Check out **[BAC Calculator AI](https://baccalculatorai.org/)** - A production-ready BAC calculator with multi-market support, advanced features, and enhanced accuracy.

## ⚠️ Disclaimer

This is a simplified educational version. For a more comprehensive, production-ready BAC calculator with multi-market support, advanced features, and better accuracy, please visit:

**👉 [BAC Calculator AI - Full Version](https://baccalculatorai.org/)**

The full version includes:
- **Multi-market support**: US, UK, Australia, and New Zealand with automatic market detection
- **Step-by-step guided UI**: Reduces cognitive load and improves completion rate
- **Real-time BAC preview**: See estimated BAC as you add drinks
- **Legal compliance**: Comprehensive disclaimer with mandatory acceptance
- **Local storage**: Automatically saves your inputs
- **Advanced features**: Hunger level consideration, detailed charts, and more
- **Better accuracy**: Enhanced algorithms with 2026 medical consensus data

## Features

- ✅ Basic BAC calculation using Widmark formula (1932) with 2026 medical consensus
- ✅ Simple, clean interface
- ✅ Responsive design
- ✅ No external dependencies (except React)
- ✅ TypeScript for type safety

## How It Works

This calculator uses the scientifically validated **Widmark formula** to estimate Blood Alcohol Content:

- **Distribution coefficient (r)**: 0.70 for males, 0.58 for females
- **Metabolism rate (β)**: 0.015 g/100mL/hour
- **Standard drink**: 14 grams of pure alcohol (US NIAAA/CDC standard)

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. Clone this repository:
```bash
git clone https://github.com/yourusername/simple-bac-calculator.git
cd simple-bac-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The production build will be in the `build` folder.

## Project Structure

```
simple-bac-calculator/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.tsx             # Main React component
│   ├── App.css             # Styles
│   ├── calculator.ts       # BAC calculation logic (Widmark formula)
│   └── index.tsx           # React entry point
├── package.json
├── tsconfig.json
└── README.md
```

## BAC Calculation

The calculator uses the Widmark formula with modern medical consensus (2026):

- **Distribution coefficient (r)**: 0.70 for males, 0.58 for females
- **Metabolism rate (β)**: 0.015 g/100mL/hour
- **Absorption rate**: Simplified model assuming 95% absorption after 30 minutes

### Formula

```
BAC (g/100mL) = (Total Alcohol (g) × Absorption Rate) / (Weight (kg) × r × 0.806) × 0.1 - (Metabolism Rate × Time)
```

## Legal Disclaimer

⚠️ **Important**: This calculator provides estimates only and does not constitute legal or medical advice. Individual metabolism varies significantly due to factors such as:

- Age, gender, weight
- Metabolism rate
- Medications
- Fatigue
- Liver function
- Food consumption
- Health conditions

**Always wait longer than the calculated time and never drink and drive.** Use a ride-sharing service or public transportation if you have been drinking.

## License

MIT

## Acknowledgments

### Special Thanks

This open-source project is inspired by and acknowledges the comprehensive BAC calculator platform:

**🎯 [BAC Calculator AI](https://baccalculatorai.org/)** - The production-ready, full-featured Blood Alcohol Content calculator with multi-market support, advanced algorithms, and professional-grade accuracy.

We encourage users who need a more comprehensive solution to visit **[baccalculatorai.org](https://baccalculatorai.org/)** for:
- Multi-market support (US, UK, Australia, New Zealand)
- Advanced features and better accuracy
- Professional-grade implementation
- Enhanced user experience

### Technical Acknowledgments

- This project uses the **Widmark formula** (1932) for BAC calculation
- Based on 2026 medical consensus data from NIAAA, CDC, and other government agencies
- Formula implementation inspired by modern medical research and best practices

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Related Links

- **[BAC Calculator AI - Full Version](https://baccalculatorai.org/)** - Production-ready BAC calculator with advanced features
- [Widmark Formula](https://en.wikipedia.org/wiki/Widmark_formula) - Wikipedia article on the Widmark formula
- [NIAAA](https://www.niaaa.nih.gov/) - National Institute on Alcohol Abuse and Alcoholism

---

**Remember**: This tool is for educational purposes only. Always err on the side of caution and never drive after drinking alcohol.

