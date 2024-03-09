type InputLabelProps = {
  name: "username" | "password" | "confirmPassword" | "cover" | "title";
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
      <span className="label-title">{title ? title : name}</span>
      {children}
    </label>
  );
}
