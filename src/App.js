import {Route, Switch} from 'react-router-dom'
import ProtectiveRoute from './components/ProtectiveRoute'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import JobPage from './components/JobsPage'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectiveRoute exact path="/" component={HomePage} />
    <ProtectiveRoute exact path="/jobs" component={JobPage} />
  </Switch>
)

export default App
