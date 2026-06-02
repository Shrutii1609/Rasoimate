🍳 RasoiMate - Smart Kitchen Companion
RasoiMate Smart Kitchen is a React-based web application designed for smart kitchen inventory management and AI-powered recipe suggestions. It leverages TypeScript, Vite, Tailwind CSS, and Firebase Authentication to provide a seamless user experience. Key features include Firebase-based user authentication, inventory tracking with expiry alerts, AI-driven recipe generation using OpenAI API, and donation functionality. The app uses React hooks with localStorage for state management and persistence, ensuring real-time updates and session continuity. Tailwind CSS is customized for a responsive and visually appealing design. This project is ideal for users looking to efficiently manage kitchen inventory while exploring AI-generated culinary ideas.

✨ Features
🔐 User Authentication

Secure Firebase Authentication
Sign up and login functionality
Protected routes for authenticated users

📦 Smart Inventory Management

Add, edit, and delete ingredients
Track quantities and expiration dates
Low stock alerts
Expiration warnings
Category-based organization

🤖 AI Recipe Generation

Get personalized recipe suggestions based on available ingredients
Powered by OpenAI API
Step-by-step cooking instructions
Ingredient-based recipe matching

💝 Donation Support

Contribute to food donation initiatives
Support community programs

🛠️ Tech Stack

Frontend Framework: React with TypeScript
Build Tool: Vite
Styling: Tailwind CSS
Authentication: Firebase Authentication
Storage: localStorage for inventory data
AI Integration: OpenAI API
Routing: React Router

🚀 Getting Started
Prerequisites

Node.js (v16 or higher)
npm or yarn
Firebase account
OpenAI API key

Installation

Clone the repository

bashgit clone https://github.com/Shrutii1609/Rasoimate.git
cd Rasoimate

Install dependencies

bashnpm install

Create a .env file in the root directory and add your credentials:

envVITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_OPENAI_API_KEY=your_openai_api_key

Start the development server

bashnpm run dev

Open your browser and navigate to http://localhost:5173

📝 Usage

Sign Up/Login: Create an account or log in to access the app
Add Ingredients: Navigate to the inventory section and add your kitchen ingredients
Track Inventory: Monitor quantities and expiration dates
Get Recipe Ideas: Click on the AI recipe feature to get suggestions based on your ingredients
Support Donations: Visit the donation page to contribute

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📄 License
This project is open source and available under the MIT License.
👨‍💻 Author
Shruti Bhise



🙏 Acknowledgments

OpenAI for the AI recipe generation API
Firebase for authentication services
All contributors and supporters of the project
