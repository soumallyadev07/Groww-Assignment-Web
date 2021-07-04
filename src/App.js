import './App.css';
import Home from './Pages/Home';
import Bank from './Pages/Bank';
import {Route, Link} from 'react-router-dom';

function App() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/bank-details" component={Bank} />
    </>
  );
}

export default App;
