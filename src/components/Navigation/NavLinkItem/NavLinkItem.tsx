import { NavLink } from 'react-router-dom';
import styles from './NavLinkItem.module.scss';

interface Props {
    to: string
    children: React.ReactNode
}

const NavLinkItem = ({ to, children }: Props): JSX.Element => {
    return (
        <li>
            <NavLink to={to} className={styles.navLinkItem}>
                {children}
            </NavLink>
        </li>
    );
};

export default NavLinkItem;
