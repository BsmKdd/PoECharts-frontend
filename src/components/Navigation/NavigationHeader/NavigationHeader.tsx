import styles from './NavigationHeader.module.scss'

interface Props {
    children: React.ReactNode
}

const NavigationHeader = ({ children }: Props): JSX.Element => {
    return <header className={styles.navigationHeader}>{children}</header>
}

export default NavigationHeader
