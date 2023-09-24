import styles from './Spinner.module.scss';

const Spinner = (): JSX.Element => {
    return (
        <div className={styles.spinnerBackDrop}>
            <div className={styles.spinner}>{"Oi, it's still loading mate"}</div>
        </div>
    );
};

export default Spinner;
