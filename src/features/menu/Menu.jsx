import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";

import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

/**
 * A loader (from React-Router) uses a render-as-you-fetch strategy
 * which is start fetching data at the same time as it starts rendering the correct route.
 * Previously we uses fetch-as-you-render in useEffect hook,
 * which created data loading waterfalls
 **/
export async function loader() {
  const menu = await getMenu();
  console.log("Menu: ", menu);

  return menu;
}

export default Menu;
