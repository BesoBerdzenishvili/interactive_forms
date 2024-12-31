import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import supabase from "../../config/supabase";
import { Answer } from "../../types/types";
import Result from "../../components/Result";
import SortArrow from "../../components/SortArrow";

interface ResultsProps {
  formId: number;
}

interface newAnswer extends Answer {
  created_at: string;
}

export default function Results({ formId }: ResultsProps) {
  const [answers, setAnswers] = useState<newAnswer[]>();
  const [orderBy, setOrderBy] = useState<string>("created_at");
  const [asc, setAsc] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchAnswers = async () => {
      const { data, error } = await supabase
        .from("answers")
        .select()
        .eq("form_id", formId)
        .order(orderBy, { ascending: asc });
      if (error) {
        console.log(error);
      }
      if (data) {
        setAnswers(data);
      }
    };
    fetchAnswers();
  }, [orderBy, asc]);
  const userIds = [...new Set(answers?.map((i) => i.author_id))];

  const sortFields = (field: string) => {
    setOrderBy(field);
    setAsc(!asc);
  };

  return (
    <div className="text-center">
      <h3>{t("template.results.title")}</h3>
      {answers?.length ? (
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
              <th onClick={() => sortFields("author_name")}>
                {t("template.results.tab.user")}
                <SortArrow
                  orderBy={orderBy}
                  fieldName="author_name"
                  asc={asc}
                />
              </th>
              <th onClick={() => sortFields("created_at")}>
                {t("template.results.tab.filled_at")}
                <SortArrow orderBy={orderBy} fieldName="created_at" asc={asc} />
              </th>
            </tr>
          </thead>
          <tbody>
            {userIds?.map((i, index) => (
              <Result
                index={index}
                answer={answers?.filter((j) => j.author_id === i)[0]}
                onClick={() => navigate(`/user-form/${formId}/${i}`)}
              />
            ))}
          </tbody>
        </Table>
      ) : (
        <p>{t("no_data.no_forms")}</p>
      )}
    </div>
  );
}
