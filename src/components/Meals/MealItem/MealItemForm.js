import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css'

const MealItemForm = props=>{


    const amountRef = useRef();

    const [amountIsValid,setAmountIsValid] = useState(true);

    const submitHandler = event =>{
        event.preventDefault();

        const enteredAmount = amountRef.current.value;

        const enteredAmountNum = +enteredAmount;

        if(enteredAmount.trim().length===0 ||
        enteredAmountNum < 1 ||
        enteredAmountNum > 5){
            setAmountIsValid(false)
            return;
        }

        props.onAddToCart(enteredAmountNum);

    }

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label='Amount' ref={amountRef} input={{
                id:'amount',
                type:'number',
                name:'amount',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
            }}/>
            <button type='submit'>+ Add</button>
        </form>
    )
}

export default MealItemForm;