import { useEffect, useState } from "react";
import supabase from "../config/supabase";

interface tag {
  tags: string[];
}

export default function useAllUniqueTags() {
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
  return [
    ...new Set(
      templates
        ?.reduce((accumulator: string[], currentObject) => {
          return accumulator.concat(currentObject.tags);
        }, [])
        .filter((tag) => tag !== undefined)
    ),
  ];
}
