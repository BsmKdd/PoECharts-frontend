import NavLinkItem from '../NavLinkItem/NavLinkItem'
import styles from './NavLinks.module.scss'

const NavLinks = (): JSX.Element => {
    return (
        <ul className={styles.navLinks}>
            <NavLinkItem to="/">Playerbase</NavLinkItem>
            <NavLinkItem to="/">Economy</NavLinkItem>
        </ul>
    )
}

export default NavLinks
