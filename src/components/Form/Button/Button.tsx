import { ComponentProps } from 'react';
import styles from './styles.module.css';

function Button(props: ComponentProps<'button'>) {
  const { children, type, ...rest } = props;
  return (
    /**
     * This lint rule has been disabled here as Typescript will ensure a value "type" is passed
     * If for any reason it isn't it will default to "button"
     * */
    // eslint-disable-next-line react/button-has-type
    <button type={type || 'button'} {...rest} className={styles.button}>
      {children}
    </button>
  );
}
export default Button;
