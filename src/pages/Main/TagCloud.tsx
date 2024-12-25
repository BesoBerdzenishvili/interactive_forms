import { Stack } from "react-bootstrap";
import TagBadge from "../../components/TagBadge";
import { useEffect, useState } from "react";
import supabase from "../../config/supabase";

interface tag {
  tags: string[];
}

export default function TagCloud() {
  const [templates, setTemplates] = useState<tag[]>([]);
  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase.from("templates").select("tags");
      if (error) {
        console.log(error);
      }
      if (data) {
        setTemplates(data);
      }
    };
    fetchTemplates();
  }, []);

  const allTags = templates
    ?.reduce((accumulator: string[], currentObject) => {
      return accumulator.concat(currentObject.tags);
    }, [])
    .filter((tag) => tag !== undefined);

  const uniqueTags = [...new Set(allTags)];
  return (
    <Stack direction="horizontal" className="overflow-auto mt-5">
      {uniqueTags.map((tag) => (
        <TagBadge key={tag} tag={tag} />
      ))}
    </Stack>
  );
}
