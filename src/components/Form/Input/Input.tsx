import { ComponentProps } from 'react';
import classes from './styles.module.css';

function Input(
  props: ComponentProps<'input'> & { label: string; error?: string }
) {
  const { label, error, required, ...rest } = props;
  return (
    /** This has been disabled as it is a valid way to associate a label with an input
     * Wrapping the input in a lab;e makes the component more reusable, as you don;t need to link it with an ID
     */
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={classes.inputHolder}>
      <span>
        {label}{' '}
        {required && <small className={classes.required}>*required</small>}
        {error && <p className={classes.error}>{error}</p>}
      </span>
      <input required={required} {...rest} />
    </label>
  );
}

export default Input;
