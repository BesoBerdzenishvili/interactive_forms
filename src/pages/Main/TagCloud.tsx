import { Stack } from "react-bootstrap";
import TagBadge from "../../components/TagBadge";
import useAllUniqueTags from "../../hooks/useAllUniqueTags";

export default function TagCloud() {
  return (
    <Stack direction="horizontal" className="overflow-auto mt-5">
      {useAllUniqueTags().map((tag) => (
        <TagBadge key={tag} tag={tag} />
      ))}
    </Stack>
  );
}
