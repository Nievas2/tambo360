import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './src/routes/AppRoutes'; // Agregamos ./src/
import { AuthProvider } from './src/context/AuthContext'; // Agregamos ./src/

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes /> 
      </AuthProvider>
    </Router>
  );
}

export default App;