type ValidationErrorProps = {
  error?: string;
};

export default function ValidationError({ error }: ValidationErrorProps) {
  return error && <span className="error">{error}</span>;
}
