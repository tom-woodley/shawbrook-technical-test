import { ComponentProps } from 'react';

function Option(props: ComponentProps<'option'>) {
  return <option {...props} />;
}

export default Option;
