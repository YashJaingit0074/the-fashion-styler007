
# 🎨 AI Fashion Styler - Aria

An intelligent fashion styling assistant powered by Google's Gemini AI. Get personalized outfit recommendations based on occasions, preferences, and location with interactive 3D avatar visualization.

## ✨ Features

- 💬 Interactive AI-powered fashion advice
- 🎤 Text-to-speech responses (powered by ElevenLabs)
- 🌍 Location-aware styling recommendations
- 👔 Curated outfit combinations for various occasions
- 🎭 3D animated avatar interface
- 📱 Responsive design

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
- (Optional) ElevenLabs API key for voice features

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YashJaingit0074/the-fashion-styler.git
   cd the-fashion-styler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Or create `.env` manually with:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🌐 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YashJaingit0074/the-fashion-styler.git&env=VITE_GEMINI_API_KEY,VITE_ELEVENLABS_API_KEY)

### Manual Deployment

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - `VITE_GEMINI_API_KEY`: Your Gemini API key
     - `VITE_ELEVENLABS_API_KEY`: Your ElevenLabs API key (optional)

5. **Redeploy** to apply environment variables
   ```bash
   vercel --prod
   ```

## 🔑 Getting API Keys

### Gemini API Key (Required)

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Get API Key"
4. Copy your API key

### ElevenLabs API Key (Optional)

1. Visit [ElevenLabs](https://elevenlabs.io/)
2. Sign up for a free account
3. Go to your profile settings
4. Copy your API key from the API section

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **AI:** Google Gemini API
- **Voice:** ElevenLabs API
- **Build Tool:** Vite
- **Deployment:** Vercel

## 📁 Project Structure

```
Ai-fashion-styler-/
├── components/
│   ├── Avatar.tsx          # 3D avatar component
│   └── ChatWindow.tsx      # Chat interface component
├── services/
│   └── geminiService.ts    # AI and voice service integration
├── utils/
│   └── audio.ts            # Audio processing utilities
├── App.tsx                 # Main application component
├── constants.tsx           # Application constants
├── types.ts                # TypeScript type definitions
├── .env.example            # Environment variables template
└── README.md               # Project documentation
```

## 🔒 Security & Privacy

- **API Keys:** Never commit `.env` files to Git. Use `.env.example` as a template.
- **Environment Variables:** All sensitive keys are stored as environment variables.
- **Vercel:** Set environment variables in the Vercel dashboard, not in code.
- **Location Data:** Location information is only used for styling recommendations and is not stored.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Yash Jain**
- GitHub: [@YashJaingit0074](https://github.com/YashJaingit0074)

## 🙏 Acknowledgments

- Google Gemini AI for intelligent fashion recommendations
- ElevenLabs for natural voice synthesis
- Three.js community for 3D graphics support
