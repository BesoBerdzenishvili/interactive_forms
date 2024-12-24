import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import supabase from "../../config/supabase";
import { Answer } from "../../types/types";
import Result from "../../components/Result";

interface ResultsProps {
  formId: number;
}

export default function Results({ formId }: ResultsProps) {
  const [answers, setAnswers] = useState<Answer[]>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchAnswers = async () => {
      const { data, error } = await supabase
        .from("answers")
        .select()
        .eq("form_id", formId)
        .order("created_at");
      if (error) {
        console.log(error);
      }
      if (data) {
        setAnswers(data);
      }
    };
    fetchAnswers();
  }, []);

  return (
    <div className="text-center">
      <h3>{t("template.results.title")}</h3>
      <Table
        bordered
        responsive
        hover
        variant={darkMode ? "dark" : ""}
        className="mt-3 text-center"
      >
        <thead>
          <tr>
            <th>{t("template.results.tab.index")}</th>
            <th>{t("template.results.tab.user")}</th>
            <th>{t("template.results.tab.filled_at")}</th>
          </tr>
        </thead>
        <tbody>
          {answers?.map((template) => (
            <Result
              template={template}
              // replace with userId and formId
              onClick={() => navigate("/user-form/5/3")}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
