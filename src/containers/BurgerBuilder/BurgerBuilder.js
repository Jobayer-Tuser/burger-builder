import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger.js';
import BuildControl from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat : 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,

    }

    updatePurchase(ingredients){//this paramete is comming from the add, remove ingredients function 

        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum, el)=>{
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler =(type)=>{
        //current Ingredient 
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updateCount;
        
        //ingredient price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);//this is goring to the updatepurchase paremeter

    }
    removeIngredientHandler = (type) => {
        //old Ingredient 
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return null;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updateCount;

        //ingredient price
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        //{salad: true, meat:false,bacon: true}

        return(
            <>
                <Burger ingredients={this.state.ingredients} />
                <BuildControl 
                    addIngredient={this.addIngredientHandler} 
                    removeIngredient={this.removeIngredientHandler} 
                    disabled = {disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable} 
                />
            </>
        );
    }
}

export default BurgerBuilder;