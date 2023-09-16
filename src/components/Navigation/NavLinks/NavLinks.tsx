import { NavLink } from 'react-router-dom'
import logo from '../../../assets/veryCat.gif'
import NavLinkItem from '../NavLinkItem/NavLinkItem'
import styles from './NavLinks.module.scss'

const NavLinks = (): JSX.Element => {
    return (
        <div className={styles.navContainer}>
            <NavLink to="/" className={styles.logo}>
                <img src={logo} alt="logo" />
            </NavLink>
            <ul className={styles.navLinks}>
                <NavLinkItem to="/playerbase">Playerbase</NavLinkItem>
                <NavLinkItem to="/economy">Economy</NavLinkItem>
            </ul>
        </div>
    )
}
export default NavLinks
