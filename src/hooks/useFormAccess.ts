import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/user/UserContext";
import supabase from "../config/supabase";

export default function useFormAccess(form_id: string | undefined) {
  const { currentUser } = useContext(CurrentUserContext);
  const [result, setResult] = useState<boolean>(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select()
        .eq("id", form_id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        if (data.who_can_fill.length === 0) {
          setResult(true);
        } else {
          setResult(data.who_can_fill.includes(currentUser.id.toString()));
        }
      }
    };
    fetchTemplate();
  }, []);
  return result;
}
