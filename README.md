# Sticky Notes App

A modern, interactive sticky notes application built with React, TypeScript, and Appwrite. Create, customize, and organize your notes in a digital workspace.

## Features
- Create new sticky notes
- Drag and position notes anywhere on the board
- Edit note content with auto-growing text areas
- Choose from multiple color themes
- Real-time saving of changes
- Delete unwanted notes
- Persistent storage with Appwrite backend

## Technologies Used
- React 19
- TypeScript
- Vite - Build tool and development server
- CSS Modules - Scoped styling
- Appwrite - Backend as a Service (BaaS)

## Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- Appwrite account and project

### Appwrite Setup
1. Create an account on Appwrite (https://appwrite.io)
2. Create a new project in the Appwrite console
3. Create a database for your project
4. Create a "notes" collection with the following attributes:
   - `body` (String) - Stores the content of your note (JSON string)
   - `colors` (String) - Stores color theme information as a JSON string
   - `position` (String) - Stores position coordinates as a JSON string
5. Set up appropriate permissions for your collection:
   - Enable read and write permissions for authenticated users
   - Or, for development purposes, you can allow all permissions
6. Create an API key with permissions to access the database
7. Copy the Project ID, Database ID, and Collection ID for use in your environment variables

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/e1101/sticky-notes.git
   cd sticky-notes
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit the .env file with your Appwrite details
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Usage
- Click the + button in the left sidebar to add a new note
- Click on any note to select it
- Drag a note by its header to reposition it
- Change the color of the selected note by clicking on a color in the sidebar
- Edit note content by clicking on its body and typing
- Delete a note by clicking the trash icon in its header

## Building for Production
```bash
npm run build
# or
yarn build
```
This will generate optimized files in the `dist` directory.

## License
MIT

## Acknowledgments
- Icons provided by custom SVG components
- Inspiration from traditional sticky notes and digital kanban boards