Workout-Tracker
This project was generated with Angular CLI version 17.3.8.

Project Description
The Health Challenge Tracker is a single-page application (SPA) designed to help users log and monitor their workout activities. Built with Angular 14+, this application allows users to input their workout details, view a list of logged workouts, and utilize various features to manage and analyze their workout data.

Features
User Input:
User Name
Workout Type
Workout Minutes
Display Workout List:
Search by user name
Filter by workout type
Pagination for easy navigation
Optional Feature:
Display workout progress using charts
Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

Running unit tests
Run ng test to execute the unit tests via Karma.

Running end-to-end tests
Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

Further help
To get more help on the Angular CLI, use ng help or check out the Angular CLI Overview and Command Reference page.

Sample Data Structure
The application uses localStorage to store user data. Here is an example of the data structure:

javascript
Copy code
userData = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    },
];
Screenshots
Input Form


Workout List


Workout Progress Chart (Optional)


References & Requirements
Input fields to add the user, workout type, and minutes with a button
Display users in a table grid
Search by username and filter by workout type
Use localStorage for data storage
Initial data with 3 users by default
Pagination for more than 5 users
Unit tests for 1 component and 1 service with 100% code coverage
Use libraries like Angular Material, PrimeNG
Host the SPA on a cloud service (Heroku, Netlify, GitHub Pages, etc.)
Bonus feature: Add charts to display user workout data
Submission
Submit your solution using the following form: Submission Form

Include:

Public link to the GitHub repository
Link to the hosted web application
Your resume
Video Submission
Record a video introducing yourself and discussing your experience with the assignment. Keep the video under 2 minutes and address the following points:

Personal introduction (name, education, hobbies, availability for a full-time internship for 6 months)
Most challenging part of the assignment
Any changes you would make to the assignment
Upload the video to Google Drive and share the public access link. Verify the link is accessible.

For any questions, contact: dimple.kh@fylehq.com

Project Status
Stars: 0 stars
Watchers: 1 watching
Forks: 0 forks
Releases: No releases published
Packages: No packages published
Languages
TypeScript: 54.2%
HTML: 44.1%
JavaScript: 1.1%
CSS: 0.6%
