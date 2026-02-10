import { useContext } from "react";

import MealItem from "./MealItem";
import { useHttp } from "../hooks/useHttp";
import Error from "./Error";
import { UserActionContext } from "../store/user-actions-context";

const requestOpt = {};

export function Meals() {
  // this will cause an infinite loop, cause it recreates the "options" dependency
  // on every render, declaring it outside the scope is the solution
  // const { data: meals, isLoading, error } = useHttp("meals", {}, [])

  const { isSideBarVisible } = useContext(UserActionContext);

  const { data: meals, isLoading, error } = useHttp("/meals", requestOpt, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul
      id="meals"
      style={{ margin: `2rem ${isSideBarVisible ? "20%" : "auto"}` }}
    >
      {meals.map((meal) => (
        <MealItem {...meal} key={meal.id} />
      ))}
    </ul>
  );
}
