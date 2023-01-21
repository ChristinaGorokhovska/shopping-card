import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Store from "./pages/Store";
import Home from "./pages/Home";
import { StoreCartProvider } from "./context/StoreCartContext";

function App() {
  return (
    <StoreCartProvider>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route path="/store" element={<Store />}></Route>
      </Routes>
    </StoreCartProvider>
  );
}

export default App;
