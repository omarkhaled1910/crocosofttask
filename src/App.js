import "./App.css";
import { appRoutes } from "./routes/routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {appRoutes.map((route, i) => (
            <Route key={i} path={route.route} element={route.component} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
