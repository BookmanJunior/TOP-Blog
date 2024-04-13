import { format } from "date-fns";

type FormattedDateProps = {
  date: string;
  className?: string;
  isTime?: boolean;
};

export default function FormattedDate({
  date,
  className,
  isTime = false,
}: FormattedDateProps) {
  return (
    <p className={className}>
      {isTime ? format(date, "HH:mm - PPP") : format(date, "PPP")}
    </p>
  );
}
