import React, { useLayoutEffect } from 'react';
import { BaseApi, Headers } from '../../api/api';
import Grid from '@material-ui/core/Grid';
import Meals from './Meals';
import { BehaviorSubject } from 'rxjs';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

export default function Categories() {
  const [categories, setCategories] = React.useState([]);
  const [meals, setMeals] = React.useState([]);
  const [lastCategory, setLast] = React.useState(0);
  // const [offset, setOffset] = React.useState(0);
  const offset = new BehaviorSubject(0);

  let gridlayout = [{ value: 0 }];
  useLayoutEffect(() => {
    offset.next(0);
    fetch(BaseApi + 'category', {
      headers: Headers,
    })
      .then((res) => res.json())
      .then((data) => {
        calcGrid(data);
        setCategories(data);
        console.log(gridlayout[0]);
      })
      .catch(console.log);
  }, []);

  function getMeals(e, off) {
    let same = compareCategories(e);
    setLast(e);
    console.log(offset.getValue());
    fetch(
      BaseApi +
        'meal/restaurant/1/category/' +
        e +
        '?offset=' +
        offset.getValue(),
      {
        headers: Headers,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        compareMeals(same, res);
      });
  }

  function calcGrid(res) {
    let gridVal;
    gridlayout = [];
    res.forEach((element, index) => {
      switch (index) {
        case 0:
          gridVal = 7;
          element.grid = gridVal;
          break;
        case 1:
          gridVal = 5;
          element.grid = gridVal;
          break;
        case 2:
          gridVal = 3;
          element.grid = gridVal;
          break;
        case 3:
          gridVal = 3;
          element.grid = gridVal;
          break;
        case 4:
          gridVal = 3;
          element.grid = gridVal;
          break;
        case 5:
          gridVal = 3;
          element.grid = gridVal;
          break;
        case 6:
          gridVal = 5;
          element.grid = gridVal;
          break;
        case 7:
          gridVal = 7;
          element.grid = gridVal;
          break;
        default:
          element.grid = 3;
          break;
      }
    });
  }

  function compareMeals(cat, res) {
    console.log(res);
    if (meals.length == 0) {
      setMeals(res);
      return false;
    }
    if (res.length === 0) {
      return false;
    }
    let last = meals[meals.length - 1].meal_id;
    let first = res[res.length - 1].meal_id;
    if (cat && last !== first) {
      setMeals(meals.concat(res));
      return true;
    }
    if (cat && last === first) {
      return false;
    }
    if (!cat) {
      setMeals(res);
      return false;
    }
  }

  function compareCategories(cat) {
    if (lastCategory === cat) {
      let lastOf = offset.getValue();
      lastOf = lastOf + 10;
      offset.next(lastOf);
      return true;
    } else {
      offset.next(0);
      return false;
    }
  }

  const DataAvail = (props) => {
    if (props.meals.length > 0) {
      return (
        <KeyboardArrowDown onClick={() => getMeals(meals[0].categoryId)} />
      );
    } else {
      return null;
    }
  };

  return (
    <div className='wrapper'>
      <div className='wrap-main-cat'>
        <div className='cat-wrapper'>
          <Grid container spacing={3} className='grid-wrap'>
            {categories.map((cat, index) => (
              <Grid
                item
                xs={cat.grid}
                className='cat-item'
                onClick={() => getMeals(cat.category_id)}
                key={cat.category_id}
              >
                <div className='ind-cat'>
                  <img className='cat-image' src={cat.link} alt={cat.name} />
                  <div className='cat-name'>
                    <span>{cat.name}</span>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <div>
        <Meals meals={meals} />
      </div>
      <DataAvail meals={meals} />
    </div>
  );
}
