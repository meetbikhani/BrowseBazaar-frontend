import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Error from "./Error";
import Products from "./Products";
import Product from "./Product";
import { useEffect } from "react";

import ThankYou from "./ThankYou";
import PaymentFailed from "./PaymentFailed";
import { useSelector, useDispatch } from "react-redux";

const Layout = () => {
  const data = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);

  useEffect(() => {
     localStorage.setItem("cart", JSON.stringify(data));
    localStorage.setItem("total", JSON.stringify(total));
  }, []);


  return (
    <div className="select-none">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/success",
        element: <ThankYou />,
      },
      {
        path: "/fail",
        element: <PaymentFailed />,
      },
      {
        path: "*",
        element: <Error />
      }
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
