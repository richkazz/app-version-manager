# How to Use App Version Manager

This guide provides detailed instructions on how to use the App Version Manager to effectively manage and track versions for your applications.

## Table of Contents

1.  [Overview](#overview)
2.  [Managing Application Configurations](#managing-application-configurations)
    *   [Adding a New Application](#adding-a-new-application)
    *   [Selecting an Application](#selecting-an-application)
    *   [Deleting an Application](#deleting-an-application)
3.  [Managing Versions](#managing-versions)
    *   [Adding a New Version](#adding-a-new-version)
    *   [Editing an Existing Version](#editing-an-existing-version)
    *   [Deleting a Version](#deleting-a-version)
4.  [Data Management (Export/Import)](#data-management-exportimport)
    *   [Exporting All Data](#exporting-all-data)
    *   [Importing Data](#importing-data)

## 1. Overview

The App Version Manager helps you keep a record of different versions for various applications you might be developing or tracking. You can define applications, and for each application, you can list multiple versions with details such as version number, release date, and a "force update" flag. All data is stored locally in your web browser's local storage, meaning it's persistent on your machine but not shared across devices or browsers automatically.

## 2. Managing Application Configurations

Application configurations allow you to group versions under a specific app. For example, you might have "My Awesome App (iOS)" and "My Awesome App (Android)" as two separate configurations.

### Adding a New Application

1.  **Locate the Application Selector:** At the top of the page, you'll find the application selector dropdown.
2.  **Click "Add New App":** Next to the dropdown, click the "+ Add New App" button.
3.  **Fill in the Form:** A modal window will appear:
    *   **App Name:** Enter a descriptive name for your application (e.g., "Main Website", "iOS Client").
    *   **App Type:** Specify the platform or type (e.g., "Web", "iOS", "Android", "API").
    *   **Initial Versions (Optional JSON):** If you have existing version data in a specific JSON format, you can paste it here. The expected format is an array of version objects, where each object should have `version` (string), `release_date` (string in YYYY-MM-DD format), and `force_update` (boolean).
        *Example JSON:*
        ```json
        [
          { "version": "1.0.0", "release_date": "2023-01-15", "force_update": false },
          { "version": "1.0.1", "release_date": "2023-02-20", "force_update": true }
        ]
        ```
4.  **Submit:** Click "Create App Config". The new application will be added and automatically selected.

### Selecting an Application

*   Simply click the dropdown menu in the "App Selector" section.
*   Choose the desired application from the list. The versions displayed below will update to reflect the selected application.

### Deleting an Application

1.  **Select the Application:** First, ensure the application you wish to delete is selected in the dropdown.
2.  **Click "Delete App":** Next to the "Add New App" button, you'll see a "Delete App" button (often represented by a trash icon or similar, if the app is selected). Click this button.
3.  **Confirm:** A confirmation prompt will appear. Confirm that you want to delete the application and all its associated versions.
    *   **Caution:** This action is irreversible.

## 3. Managing Versions

Once an application is selected, you can manage its specific versions.

### Adding a New Version

1.  **Ensure an App is Selected:** If no app is selected, or if you have no apps, you'll need to select or create one first.
2.  **Click "Add New Version":** Below the application details, find and click the "+ Add New Version" button.
3.  **Fill in the Form:** A modal window will appear:
    *   **Version:** Enter the version number (e.g., "1.0.2", "2.3.4-beta").
    *   **Release Date:** Select or enter the date the version was (or will be) released. A date picker is usually provided.
    *   **Force Update:** Check this box if this version should be a mandatory update for users.
4.  **Submit:** Click "Add Version". The new version will appear in the list for the currently selected application.

### Editing an Existing Version

1.  **Locate the Version:** In the list of versions for the selected application, find the version you wish to edit.
2.  **Click the Edit Icon:** Each version entry will have an "Edit" button (often a pencil icon). Click it.
3.  **Modify the Form:** A modal window, pre-filled with the version's current details, will appear.
    *   Update the version number, release date, or force update status as needed.
4.  **Submit:** Click "Save Changes". The version details will be updated.

### Deleting a Version

1.  **Locate the Version:** In the list of versions for the selected application, find the version you wish to delete.
2.  **Click the Delete Icon:** Each version entry will have a "Delete" button (often a trash icon). Click it.
3.  **Confirm:** A confirmation prompt will appear. Confirm that you want to delete this specific version.
    *   **Caution:** This action is irreversible.

## 4. Data Management (Export/Import)

You can export all your application configurations and versions into a single JSON file for backup or migration purposes, and import data from such a file.

### Exporting All Data

1.  **Locate Data Management Section:** This is usually found in the footer of the application.
2.  **Click "Export All Data":**
    *   If you have data, a file named `app-version-manager-data.json` will be automatically downloaded by your browser. This file contains all your app configurations and their versions.
    *   If there is no data to export, an alert message will notify you.
3.  **Save the File:** Store this file in a safe place if you intend to use it as a backup.

### Importing Data

1.  **Locate Data Management Section:** This is usually found in the footer of the application.
2.  **Click "Import Data from File":** This button will open a file selection dialog.
3.  **Select a JSON File:** Choose a `.json` file that was previously exported from this application (or one that matches the expected format).
    *   **Expected Format:** The file should contain a JSON array of application configurations. Each application configuration object should have:
        *   `id`: string (a unique identifier)
        *   `name`: string
        *   `type`: string
        *   `versions`: an array of version objects.
        Each version object within the `versions` array should have:
        *   `id`: string (a unique identifier)
        *   `version`: string
        *   `force_update`: boolean
        *   `release_date`: string (preferably in ISO 8601 format, e.g., "YYYY-MM-DD")
4.  **Confirm Overwrite:** A confirmation dialog will appear, warning you that **importing will overwrite all current data in the application.**
    *   Click "OK" or "Confirm" to proceed.
    *   Click "Cancel" to abort the import.
5.  **Outcome:**
    *   **Success:** If the file is valid and you confirm, the data will be imported. The application will refresh to show the new data, and a success message will appear.
    *   **Error:** If the file is not in the correct format, or if there's an error during reading/parsing, an error message will be displayed. Your existing data will remain untouched.

---

Remember to regularly export your data if you consider it critical, as browser local storage can be cleared by user actions or browser settings.Tool output for `create_file_with_block`:
