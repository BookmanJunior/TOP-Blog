import { format } from "date-fns";

type FormattedDateProps = {
  date: string;
  className?: string;
};

export default function FormattedDate({ date, className }: FormattedDateProps) {
  return <p className={className}>{format(date, "PPP")}</p>;
}
