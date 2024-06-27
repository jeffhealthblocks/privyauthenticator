import logo from './logo.svg';
import './App.css';
import { PrivyAuthDemo } from "./privy.js"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Healthblocks authenticator - Login Below
        </p>
        <PrivyAuthDemo />
      </header>
    </div>
  );
}

export default App;
