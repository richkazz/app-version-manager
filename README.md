# App Version Manager

**Manage and track versions for your applications with ease!**

App Version Manager is a straightforward, client-side web application designed to help you keep a meticulous record of different versions for various software projects. Whether you're managing mobile apps, web platforms, APIs, or any other software, this tool provides a simple interface to organize version information, release dates, and mandatory update flags.

All data is stored locally in your web browser, ensuring your information is persistent on your machine. You can also export all your data for backup or migration and import it back when needed.

## ✨ Features

*   **Multiple Application Configurations:** Organize versions under distinct application profiles (e.g., "iOS App", "Android App", "Web Portal").
*   **Detailed Version Tracking:** For each application, store:
    *   Version numbers (e.g., "1.0.0", "2.1.3-beta")
    *   Release dates
    *   A "Force Update" flag to indicate mandatory updates.
*   **Intuitive Interface:** Easily add, edit, and delete applications and their versions.
*   **Data Persistence:** Information is saved in your browser's local storage.
*   **Export & Import:**
    *   Export all your application and version data to a single JSON file for backup or sharing.
    *   Import data from a JSON file, allowing you to restore previous states or migrate data (Note: Import overwrites existing data).
*   **Purely Client-Side:** Runs entirely in your browser. No backend or database setup required.

## 🚀 Setup & Running Locally

This application is designed to run directly in your web browser without any complex setup.

**Prerequisites:**
*   A modern web browser (like Chrome, Firefox, Safari, Edge)
*   Node.js and npm (Node Package Manager) installed on your system if you wish to run it from the source code or contribute to development.

**Running from Source:**

1.  **Clone the Repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install Dependencies:**
    Open your terminal in the project's root directory and run:
    ```bash
    npm install
    ```
3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will typically start a local development server (often at `http://localhost:5173` or a similar address). Open this URL in your web browser to use the application.

**Note on API Keys:** The previous `README.md` mentioned a `GEMINI_API_KEY`. This application, the App Version Manager, does not require any external API keys to function.

## 📖 How to Use

For detailed instructions on how to use all the features of the App Version Manager, please refer to our comprehensive guide:

➡️ **[HOW_TO_USE.md](HOW_TO_USE.md)**

This guide covers:
*   Adding, selecting, and deleting application configurations.
*   Adding, editing, and deleting versions.
*   Exporting your data for backup.
*   Importing data from a backup file.

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find any bugs, please feel free to open an issue or submit a pull request.

---

Happy Version Managing!
