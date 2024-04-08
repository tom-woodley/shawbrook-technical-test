import { ComponentProps } from 'react';

import classes from './styles.module.css';

function Select(
  props: ComponentProps<'select'> & { label: string; error?: string }
) {
  const { children, error, required, label, ...rest } = props;
  return (
    /** This has been disabled as it is a valid way to associate a label with an input
     * Wrapping the input in a label makes the component more reusable, as you don;t need to link it with an ID
     */
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={classes.inputHolder}>
      <span>
        {label}{' '}
        {required && <small className={classes.required}>*required</small>}
        {error && <p className={classes.error}>{error}</p>}
      </span>
      <select required={required} {...rest}>
        {children}
      </select>
    </label>
  );
}

export default Select;
