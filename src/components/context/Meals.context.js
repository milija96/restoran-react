import { React, useState, createContext } from 'react';


export const MealsContext = createContext();

export const MealsProvider = props => {
    const [meals, setMeals] = useState([
        {
            name: 'Riba',
            id: 1
        }
    ])
    return (
        <MealsContext.Provider>
            {props.children}
        </MealsContext.Provider>
    );
}