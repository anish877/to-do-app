
# DoIt - A Task Management App

Welcome to **DoIt**, a feature-rich task management application built with React. This app is designed to help users efficiently organize tasks, set reminders, and manage priorities, all while offering a seamless user experience. 

## Features

- **Task Creation and Management**: Add, edit, and delete tasks with ease.
- **Priority Levels**: Assign tasks with priorities (Low, Medium, High).
- **Reminders and Due Dates**: Set reminders and due dates for better organization.
- **Step Management**: Add detailed steps for tasks and mark them as completed.
- **View Modes**: Switch between grid and list views for better visibility.
- **Task Statistics**: Visualize task completion using a pie chart.
- **Starred Tasks**: Highlight important tasks by starring them.
- **Mobile Friendly**: Responsive design ensures a smooth experience across devices.

## How It Works

1. **Adding Tasks**: 
   - Input task details and assign priority levels.
   - Save tasks to local storage for persistent management.
2. **Task Details**:
   - View and manage task-specific details like steps, reminders, and due dates.
   - Add notes and mark steps as completed.
3. **Task Overview**:
   - Visualize task completion statistics using a pie chart.
   - Separate views for completed and pending tasks.
4. **Interactive Features**:
   - Star tasks to mark them as important.
   - Toggle between grid and list views for different layouts.

## Technologies Used

- **Frontend**: React.js
- **State Management**: Redux Toolkit
- **Icons**: Lucide-React
- **Charts**: Recharts (for pie chart visualization)
- **CSS**: TailwindCSS for modern styling
- **Local Storage**: For persistent task storage

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url
   cd doit-task-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

<img width="747" alt="Screenshot 2025-01-17 at 9 13 22 AM" src="https://github.com/user-attachments/assets/f617a025-ba81-4811-8635-2bbda5410ba0" />

<img width="970" alt="Screenshot 2025-01-17 at 9 14 44 AM" src="https://github.com/user-attachments/assets/2895bcb8-6939-460f-8b01-5039240e74ff" />

<img width="534" alt="Screenshot 2025-01-17 at 9 14 25 AM" src="https://github.com/user-attachments/assets/611a4d8c-6230-40d3-a965-d566b692120b" />



*Replace `path-to-screenshotX.png` with the actual paths to your screenshots.*

## Folder Structure

```plaintext
src/
├── components/
│   ├── ui/
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Sidebar.js
│   │   ├── CreateContentModel.js
│   │   ├── ShareContentModel.js
│   ├── Content.js
│   ├── App.js
├── features/
│   ├── auth/
│   │   ├── authSlice.js
├── store/
│   ├── store.js
├── assets/
│   ├── icons/
├── App.css
```

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests to improve the app.

## License

This project is licensed under the [MIT License](LICENSE).

---
