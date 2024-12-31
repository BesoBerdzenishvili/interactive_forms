import { Stack } from "react-bootstrap";
import TagBadge from "../../components/TagBadge";
import useAllUniqueTags from "../../hooks/useAllUniqueTags";
import { useTranslation } from "react-i18next";

export default function TagCloud() {
  const tags = useAllUniqueTags();
  const { t } = useTranslation();
  return (
    <Stack direction="horizontal" className="overflow-auto mt-3">
      {tags.length ? (
        tags.map((tag) => <TagBadge key={tag} tag={tag} />)
      ) : (
        <p>{t("no_data.no_tags")}</p>
      )}
    </Stack>
  );
}
