import NavLinks from './NavLinks/NavLinks'
import styles from './Navigation.module.scss'
import NavigationHeader from './NavigationHeader/NavigationHeader'

const Navigation = (): JSX.Element => {
    return (
        <>
            {/* {Add side barr} */}
            <NavigationHeader>
                <NavLinks />
            </NavigationHeader>
        </>
    )
}

export default Navigation
