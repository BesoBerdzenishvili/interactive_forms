import { useContext, useEffect, useState } from "react";
import { TemplateData } from "../../types/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import supabase from "../../config/supabase";
import { Table } from "react-bootstrap";

type newTemplateData = Pick<TemplateData, "id" | "title" | "filled_forms">;

export default function PopularTemplates() {
  const [filledForms, setFilledForms] = useState<newTemplateData[]>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("id, title, filled_forms")
        .order("filled_forms", { ascending: false })
        .limit(5);
      if (error) {
        console.log(error);
      }
      if (data) {
        setFilledForms(data);
      }
    };
    fetchTemplates();
  }, []);
  return (
    <>
      <h3>{t("main.popular_title")}</h3>
      <Table
        bordered
        variant={darkMode ? "dark" : ""}
        hover
        className="text-center"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>{t("main.tab.title")}</th>
            <th>{t("main.tab.responses")}</th>
          </tr>
        </thead>
        <tbody>
          {/* learn how to manipulate table widths */}
          {filledForms?.map((form, index) => (
            <tr key={form.id} onClick={() => navigate(`/template/${form.id}`)}>
              <td>{index + 1}</td>
              <td>{form.title}</td>
              <td>{form.filled_forms}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
