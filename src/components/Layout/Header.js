import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';
import { useContext } from 'react';

const Header = props => {

    return(
        <>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img alt='Meals' src={mealsImage}/>
            </div>
        </>
    )
}

export default Header;