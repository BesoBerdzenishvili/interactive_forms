import { useContext, useEffect, useState } from "react";
import { Col, Table } from "react-bootstrap";
import PanelCell from "../../components/PanelCell";
import { useTranslation } from "react-i18next";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import { CurrentUserContext } from "../../contexts/user/UserContext";
import { Answer } from "../../types/types";
import supabase from "../../config/supabase";
import SortArrow from "../../components/SortArrow";

export default function FilledForms() {
  const [filledForms, setFilledForms] = useState<Answer[]>([]);
  const [orderBy, setOrderBy] = useState<string>("order");
  const [asc, setAsc] = useState<boolean>(true);

  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchAnswers = async () => {
      const { data, error } = await supabase
        .from("answers")
        .select()
        .eq("author_id", currentUser.id)
        .order(orderBy);
      if (error) {
        console.log(error);
      }
      if (data) {
        setFilledForms(data);
      }
    };
    fetchAnswers();
  }, [orderBy]);

  const formIds = [...new Set(filledForms?.map((i) => i.form_id))];

  const handleSort = (column: string) => {
    setOrderBy(column);
    setAsc(!asc);
  };
  return (
    <Col className="text-center">
      <h3 className="text-secondary">{t("user_panel.filled_forms.title")}</h3>
      <Table
        bordered
        responsive
        hover
        variant={darkMode ? "dark" : ""}
        className="mt-3"
        style={{ overflow: "auto" }}
      >
        <thead>
          <tr>
            <th>{t("user_panel.filled_forms.tab.index")}</th>
            <th onClick={() => handleSort("template_title")}>
              {t("user_panel.filled_forms.tab.template")}
              <SortArrow
                orderBy={orderBy}
                fieldName="template_title"
                asc={asc}
              />
            </th>
            <th onClick={() => handleSort("author_name")}>
              {t("user_panel.filled_forms.tab.author")}
              <SortArrow orderBy={orderBy} fieldName="author_name" asc={asc} />
            </th>
          </tr>
        </thead>
        <tbody>
          {formIds.map((formId, index) => (
            <PanelCell
              key={formId}
              answer={filledForms?.filter((j) => j.form_id === formId)[0]}
              formId={formId}
              index={index}
            />
          ))}
        </tbody>
      </Table>
    </Col>
  );
}
