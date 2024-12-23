import { useEffect, useState } from "react";
import supabase from "../config/supabase";
import { User } from "../types/types";

export default function useNameById(userId: number) {
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from("profiles").select();
      if (data) {
        setUsers(data);
      }

      if (error) {
        console.log(error);
      }
    };
    fetchProfiles();
  }, []);
  if (users) {
    return users.filter((i) => i.id === userId)[0].name || "No such user";
  }
}
