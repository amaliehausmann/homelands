import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { UserContextProvider } from "./context/userContext";
import { Listings } from "./pages/Listings";
import { ListingDetails } from "./pages/ListingDetails";
import { PageNotFound } from "./pages/PageNotFound";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/boliger" element={<Listings />}></Route>
              <Route path="/boliger/search/:keyword" element={<Listings />}></Route>
              <Route path="/boliger/:id" element={<ListingDetails/>}></Route>
              <Route path="/*" element={<PageNotFound/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
