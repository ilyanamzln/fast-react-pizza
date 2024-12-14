import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import User from "./features/user/CreateUser";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action as updateOrderAction } from "./features/order/UpdateOrder";

/** React Router
 *
 * 1. ErrorElement will provide useRouteError() in specified element to display error message
 * when route not found/error in loader functions.
 *
 * 2. Loader is a function to get returned value from a specified function (usually api fetching)
 * at the same time the specified element is being rendered.
 * A loader uses a render-as-you-fetch strategy
 * which is start fetching data at the same time as it starts rendering the correct route.
 * Previously we uses fetch-as-you-render in useEffect hook,
 * which created data loading waterfalls.
 * A loader function optionally takes URL params as parameters.
 * useLoaderData() inside the element will return the value.
 *
 * 3. Children routes will be displayed in <Outlet />.
 *
 * 4. Action: whenever a form is submiited from the specified path, the action function will be called.
 * Action function takes the form value as parameters,
 * so we can do logic (POST request) using the value inside the function
 * Action is used with Form by React Router inside the specified element.
 *
 */
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <Error />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
      { path: "/user", element: <User /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
