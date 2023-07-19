import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import UserManager from "./components/UserManager";
import ProductManager from "./components/ProductManager";
import OrderManager from "./components/OrderManager";
import RequiredAdmin from "./components/RequireAuth/RequireAuth";
import Login from "./components/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequiredAdmin />}>
          <Route
            path="/"
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          />
          <Route
            path="/user"
            element={
              <DefaultLayout>
                <UserManager />
              </DefaultLayout>
            }
          />
          <Route
            path="/product"
            element={
              <DefaultLayout>
                <ProductManager />
              </DefaultLayout>
            }
          />
          <Route
            path="/order"
            element={
              <DefaultLayout>
                <OrderManager />
              </DefaultLayout>
            }
          />
        </Route>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
