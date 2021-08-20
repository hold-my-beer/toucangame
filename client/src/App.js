import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MinorIslandScreen from "./screens/MinorIslandScreen";

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <div className="container">
          <Route path="/" component={MinorIslandScreen} />
        </div>
      </>
    </Router>
  );
};

export default App;
