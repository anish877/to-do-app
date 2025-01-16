
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

## Screenshots
<img width="1512" alt="Screenshot 2025-01-16 at 5 44 31 PM" src="https://github.com/user-attachments/assets/8fe4467b-4789-4bbf-88c5-691833c7cfe9" />

### Task Management
<img width="1512" alt="Screenshot 2025-01-16 at 5 44 04 PM" src="https://github.com/user-attachments/assets/7d6a9aa6-e7cf-4322-846d-91b1b9db4c8a" />

### Task Details Sidebar
<img width="1511" alt="Screenshot 2025-01-16 at 5 44 20 PM" src="https://github.com/user-attachments/assets/d54382b5-1221-4f2e-94bb-5caf389182f4" />


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
