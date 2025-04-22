import { NotesProvider } from "./contexts/note-context";
import NotesPage from "./pages/notes-page";

function App() {
  return (
    <div id="app">
      <NotesProvider>
        <NotesPage />
      </NotesProvider>
    </div>
  );
}

export default App;
