import styles from "./AvailableMeals.module.css";
import { useState, useEffect } from "react";
import MealsItem from "./MealsItem";
import Card from "../UI/Card";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [hasError, setHasError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-5a722-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        setHasError(true);
        throw new Error("Something Went Wrong");
      }

      const responseData = await response.json();

      let loadedMeal = [];

      for (const key in responseData) {
        loadedMeal.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeal);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHasError(error.message);
    });
  }, []);

  if (hasError) {
    return (
      <div>
        <p>{hasError}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <p>...is Loading</p>
      </div>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealsItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul> {mealsList} </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
