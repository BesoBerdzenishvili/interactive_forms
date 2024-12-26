interface SortArrowProps {
  orderBy: string;
  fieldName: string;
  asc: boolean;
}

export default function SortArrow({ orderBy, fieldName, asc }: SortArrowProps) {
  return (
    orderBy === fieldName && (
      <i className={`bi bi-caret-${asc ? "up" : "down"}-fill ms-2`} />
    )
  );
}
