import { useEffect, useState } from "react";
import supabase from "../config/supabase";
import { User } from "../types/types";

type newUser = Pick<User, "id" | "name">;

export default function useNameById(userId: number) {
  const [users, setUsers] = useState<newUser[]>();
  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name");
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
