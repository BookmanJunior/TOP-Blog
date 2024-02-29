type InputLabelProps = {
  name: string;
  title?: string;
  children?: React.ReactNode | React.ReactNode[];
};

type FormInputProps = InputLabelProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  name,
  children,
  title,
  ...props
}: FormInputProps) {
  return (
    <InputLabel name={name} title={title}>
      <input name={name} id={name} {...props} />
      {children}
    </InputLabel>
  );
}

function InputLabel({ name, children, title = "" }: InputLabelProps) {
  return (
    <label htmlFor={name}>
      {title ? title : name}
      {children}
    </label>
  );
}
