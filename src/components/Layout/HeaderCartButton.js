import { useContext, useEffect, useState } from 'react'
import CartContext from '../../context/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props =>{

    const [itemIsChange,setItemIsChange] = useState(false);

    const cartContext = useContext(CartContext);

    const {items:items} = cartContext;

    const btnClasses = `${classes.button} ${itemIsChange ? classes.bump : ''}`;


    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setItemIsChange(true)
        const changeItem = setTimeout(()=>{
            setItemIsChange(false)
        },200)

        return ()=>{
            clearTimeout(changeItem)
        }
    },[items])

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{items.length}</span>
        </button>
    )
}

export default HeaderCartButton