import React from 'react';
import './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';


const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Meat', type: 'meat'},
]

const buildControls = (props) =>{

    return(
        <div className="BuildControls">
            <p>Current Burger Price : <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((ctrl) => (
                    <BuildControl
                    key={ctrl.label}
                    label={ctrl.label} 
                    addItems={()=> props.addIngredient(ctrl.type)} 
                    removeItems={()=> props.removeIngredient(ctrl.type)} 
                    disabled = {props.disabled[ctrl.type]}
                />
            ))};
            <button disabled={ !props.purchasable } className="OrderButton">Order Now</button>
        </div>

    );
}

export default buildControls;