# Todo App - Frontend (Next.js + Tailwind)
## Requirements
#Features
1. Home View
   - List of tasks showing:
     - Title
     - Checkbox/toggle for completed status
     - Delete button
   - Create Task button → navigates to form
   - Summary text: "Tasks: X" and "Completed: Y of X"
   - Clicking a task → navigates to Edit Task Page

2. Create/Edit Task Page
   - Form with:
     - Title (required)
     - Color (red, blue, green options)
   - Behavior:
     - Create Task → saves new task, redirects to Home
     - Edit Task → updates existing task, redirects to Home
     - Back without saving → discard changes
       
3. Additional Features
   - Toggle completion directly on Home
   - Delete with confirmation
This is the frontend of the Todo App built with Next.js 15 and Tailwind CSS.  
It communicates with the backend REST API to manage tasks.

---

# Setup Instructions (Windows CMD)
#Clone the repo
git clone https://github.com/yourusername/todo-frontend.git
cd todoapp
Step1: create client folder inside client folder copy all the frontend

Step2: #Install dependencies
npm install

#Start Next.js dev server
npm run dev

Open in browser:
http://localhost:3000<img width="296" height="667" alt="Screenshot 2025-08-27 215155" src="https://github.com/user-attachments/assets/7825cf36-e0c8-4b7b-a5a1-e9f909c56d4c" />
