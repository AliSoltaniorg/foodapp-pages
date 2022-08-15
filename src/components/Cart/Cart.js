import { useContext } from 'react';
import CartContext from '../../context/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartItem from './CartItem';

const Cart = props => {

    const cartContext = useContext(CartContext)

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`

    const cartItemsCount = cartContext.items.length;

    const decreaseHandler = (id) => {
        cartContext.removeItem(id)
    }

    const increaseHandler = (item) => {
        item = {
            ...item,
            amount:1
        }
        cartContext.addItem(item);
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartContext.items.map(item => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={increaseHandler.bind(null,item)}
                    onRemove={decreaseHandler.bind(null,item.id)} />
            ))}
        </ul>
    );

    return (
        <Modal onClose={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button type='button' className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                {cartItemsCount !== 0 && <button type='button' className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;