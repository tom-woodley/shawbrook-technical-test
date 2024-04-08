import { ComponentProps } from 'react';

function Form(props: ComponentProps<'form'>) {
  const { children, ...rest } = props;
  return <form {...rest}>{children}</form>;
}

export default Form;
