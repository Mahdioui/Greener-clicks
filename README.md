# GreenGlide (EcoSite Analyzer)

A full-stack web application that estimates a website's carbon footprint using the **Sustainable Web Design Model (SWDM v4)** methodology, inspired by WebsiteCarbon.com. Built with Next.js 14, TypeScript, TailwindCSS, Prisma, and Puppeteer.

## Features

### 🔍 Advanced URL Analysis
- **Headless Browser Analysis**: Uses Puppeteer to capture all network requests (CSS, JS, images, fonts, etc.)
- **Resource Breakdown**: Detailed categorization of data transfer by resource type
- **SWDM v4 Calculation**: Implements Sustainable Web Design Model v4 for accurate CO₂ estimation
- **Green Hosting Detection**: Integrates with Green Web Foundation API to check if hosting is powered by renewable energy
- **Real-time Analysis**: Captures actual page load with all resources

### 📊 Comprehensive Results Dashboard
- **EmissionsCard**: Displays CO₂ per visit, yearly emissions, page size, and a 0–100 green score
- **ResourceBreakdown**: Visual breakdown of emissions by resource type (images, JS, CSS, fonts, other), including CO₂ share where available
- **ComparisonCard**: Environmental impact comparisons (car km, trees, smartphone charges, flights, kettles boiled, streaming hours, burgers)
- **EnergyGauge**: Circular progress indicator for energy efficiency score
- **EmissionsChart**: Line graph showing monthly CO₂ trends
- **RecommendationList**: Actionable recommendations with estimated CO₂ savings per optimization

### 📈 Analysis History
- **History Dashboard**: View all past analyses with trends over time
- **Database Storage**: All analyses saved to database (SQLite for dev, PostgreSQL for production)
- **Trend Charts**: Visualize CO₂ emissions over time



## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Shadcn/UI (Radix UI primitives)
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (production)
- **Browser Automation**: Puppeteer
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- For production: PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Website Carbon Emitter"
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Copy .env.example to .env
cp .env.example .env

# Initialize database (SQLite for development)
npm run db:push
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

For development, the app uses SQLite (no setup required). For production:

1. Create a PostgreSQL database
2. Update `DATABASE_URL` in `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/ecosite?schema=public"
```
3. Run migrations:
```bash
npm run db:push
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.ts          # Main analysis API (Puppeteer + SWDM)
│   │   └── history/
│   │       └── route.ts           # Analysis history API
│   ├── history/
│   │   └── page.tsx               # History dashboard page
│   ├── results/
│   │   └── page.tsx               # Results page
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Homepage
├── components/
│   ├── ui/                        # Shadcn/UI components
│   ├── EmissionsCard.tsx
│   ├── ComparisonCard.tsx
│   ├── EnergyGauge.tsx
│   ├── ResourceBreakdown.tsx     # NEW: Resource breakdown visualization
│   ├── RecommendationList.tsx    # Enhanced with CO₂ savings
│   ├── EmissionsChart.tsx
│   └── SkeletonLoader.tsx
├── lib/
│   ├── db.ts                      # Prisma client
│   ├── utils.ts                   # Utility functions
│   ├── swdm-calculator.ts         # SWDM v4 calculation engine
│   └── green-hosting.ts           # Green Web Foundation integration
├── prisma/
│   └── schema.prisma              # Database schema
└── __tests__/
    └── swdm-calculator.test.ts    # Unit tests
```

## API Endpoints

### POST `/api/analyze`

Analyzes a website using Puppeteer and returns comprehensive CO₂ emission data.

**Request Body:**
```json
{
  "url": "example.com",
  "monthlyVisits": 10000,
  "region": "global"
}
```

**Response:**
```json
{
  "co2PerVisit": 0.52,
  "yearlyCO2": 62400,
  "pageSizeMB": 2.5,
  "greenHosting": false,
  "totalRequests": 45,
  "resourceBreakdown": {
    "images": 1500,
    "js": 600,
    "css": 200,
    "fonts": 100,
    "other": 100
  },
  "breakdown": {
    "dataCenter": 0.15,
    "network": 0.25,
    "client": 0.12,
    "total": 0.52
  },
  "comparisons": {
    "carKm": 520,
    "trees": 2.97,
    "charges": 7800000,
    "shortFlights": 0.54,
    "kettleBoils": 900,
    "streamingHours": 1134.55,
    "beefBurgers": 10.4
  },
  "url": "https://example.com",
  "monthlyVisits": 10000
}
```

### GET `/api/history`

Retrieves analysis history.

**Query Parameters:**
- `limit`: Number of results (default: 20)
- `offset`: Pagination offset (default: 0)
- `domain`: Filter by domain

## CO₂ Calculation Methodology

### Sustainable Web Design Model (SWDM v4)

The app uses the Sustainable Web Design Model v4, which accounts for:

1. **Data Center Energy**: Energy consumed by servers hosting the website
   - Standard hosting: ~0.015 kWh/GB
   - Green hosting: ~0.0075 kWh/GB (50% reduction)

2. **Network Energy**: Energy for data transmission
   - ~0.025 kWh/GB

3. **Client Device Energy**: Energy consumed by user's device
   - ~0.02 kWh/GB

4. **Carbon Intensity**: Global average grid carbon intensity
   - ~442 gCO₂/kWh (2023 average)

**Formula:**
```
Total Energy (kWh) = (DataCenter + Network + Client) × Data Transfer (GB)
CO₂ (g) = Total Energy × Carbon Intensity
```

### Comparisons

- **Car km equivalent**: Based on regional averages (global: 120g CO₂/km)
- **Trees needed**: Average tree absorbs ~21kg CO₂ per year
- **Smartphone charges**: ~0.008 kg CO₂ per charge
- **Kettles of water boiled**: ~70g CO₂ per boil
- **Short flights**: ~115kg CO₂ per passenger

## Green Hosting

The app checks if a website uses green hosting via the [Green Web Foundation API](https://www.thegreenwebfoundation.org/). Green hosting reduces data center emissions by approximately 50%.

## Eco Recommendations

The app provides 9+ actionable recommendations with estimated CO₂ savings:

1. **Compress Images** (High Impact) - Use WebP/AVIF, save ~70% of image CO₂
2. **Minify JS & CSS** (High Impact) - Remove whitespace, save ~40% of script CO₂
3. **Enable Caching** (High Impact) - Reduce repeat downloads, save ~50% per return visit
4. **Use Green Hosting** (High Impact) - Reduce data center emissions by ~50%
5. **Optimize Fonts** (Medium Impact) - Subset fonts, save ~60% of font CO₂
6. **Lazy Load Images** (Medium Impact) - Load on demand, save ~40% of image CO₂
7. **Reduce Third-Party Scripts** (High Impact) - Limit trackers, save ~20% of JS CO₂
8. **Use Efficient CSS** (Medium Impact) - Remove unused CSS, save ~50% of CSS CO₂
9. **Avoid Auto-playing Videos** (High Impact) - Videos are large, save 0.5-2g per video

Recommendations are filtered based on the actual resource breakdown of the analyzed website.

## Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Database Management

View database in Prisma Studio:
```bash
npm run db:studio
```

## Building for Production

1. Set up PostgreSQL database
2. Update `DATABASE_URL` in `.env`
3. Run database migrations:
```bash
npm run db:push
```
4. Build the application:
```bash
npm run build
```
5. Start the production server:
```bash
npm start
```

## Future Improvements

- [ ] User accounts and personal analysis history
- [ ] Batch analysis for multiple URLs
- [ ] API rate limiting and caching
- [ ] More detailed resource analysis (third-party scripts, CDN usage)
- [ ] Regional carbon intensity selection
- [ ] Export analysis reports (PDF)
- [ ] Integration with Lighthouse for performance metrics
- [ ] Comparison with industry benchmarks

## Methodology References

- [Sustainable Web Design Model](https://sustainablewebdesign.org/)
- [WebsiteCarbon.com Methodology](https://www.websitecarbon.com/how-does-it-work/)
- [Green Web Foundation](https://www.thegreenwebfoundation.org/)


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
