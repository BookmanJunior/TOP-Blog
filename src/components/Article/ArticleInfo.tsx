import FormattedDate from "../FormattedDate";

type ArticleInfoProps = {
  author: string;
  date: string;
  className?: string;
};

export default function ArticleInfo({
  author,
  date,
  className,
}: ArticleInfoProps) {
  return (
    <div className={`${className}`}>
      <p>{author}</p>
      <span>-</span>
      <FormattedDate date={date} />
    </div>
  );
}
