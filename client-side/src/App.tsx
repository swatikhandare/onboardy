import './App.css'
import NavigationBar from './components/NavigationBar';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Router />
      </BrowserRouter>
    </div>
  )
}

export default App
