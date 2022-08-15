import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const AvailableMeals = props => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);

  const fetchMealsData = useCallback(async () => {
    try {
      const response = await fetch('https://react-http-d74be-default-rtdb.firebaseio.com/meals');
      if (!response.ok)
        throw new Error('Something went wrong!');
      const data = await response.json();
      let mealsData = [];
      for (const key in data) {
        mealsData.push({ id: key, name: data[key].name, description: data[key].description, price: data[key].price });
      }
      setMeals(mealsData);

    } catch (error) {
      setIsLoading(false);
      setHasError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsData();
  }, [fetchMealsData]);

  if (isLoading) {
    return <section className={classes.loading}><h2>Loading...</h2></section>
  }

  if (hasError) {
    return <section className={classes.error}><h2>{hasError}</h2></section>
  }


  const mealList = meals.map(meal => <MealItem id={meal.id} name={meal.name} price={meal.price} description={meal.description} key={meal.id} />)

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealList}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals;