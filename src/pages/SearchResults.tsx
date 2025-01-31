import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabase";
import { Table } from "react-bootstrap";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";
import { useTranslation } from "react-i18next";
import SortArrow from "../components/SortArrow";

interface TemplateData {
  id: number;
  title: string;
  date: string;
}
export default function SearchResults() {
  const { searchTerm, tags } = useParams();
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [order, setOrder] = useState<string>("date");
  const [asc, setAsc] = useState<boolean>(false);
  const { darkMode } = useContext(DarkModeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("id, title, date")
        .or(
          tags
            ? `tags.cs.{"${searchTerm}"}`
            : `title.ilike.%${searchTerm}%, description.ilike.%${searchTerm}%, topic.ilike.%${searchTerm}%, tags.cs.{"${searchTerm}"}`
        )
        .order(order, { ascending: asc });

      if (error) {
        console.log(error);
      }
      if (data) {
        setTemplates(data);
      }
    };
    fetchTemplates();
  }, [searchTerm, order, asc]);

  const orderTable = (field: string) => {
    setOrder(field);
    setAsc(!asc);
  };
  return (
    <Table
      className="text-center"
      striped
      bordered
      hover
      variant={darkMode ? "dark" : ""}
    >
      {templates.length ? (
        <>
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => orderTable("title")}>
                {t("search_results.title")}
                <SortArrow orderBy={order} fieldName="title" asc={asc} />
              </th>
              <th onClick={() => orderTable("date")}>
                {t("search_results.date")}
                <SortArrow orderBy={order} fieldName="date" asc={asc} />
              </th>
            </tr>
          </thead>
          <tbody>
            {templates.map((i, index) => (
              <tr key={i.id} onClick={() => navigate(`/template/${i.id}`)}>
                <td>{index + 1}</td>
                <td>{i.title}</td>
                <td>{i.date.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </>
      ) : (
        <h2 className="position-absolute top-50 start-50 translate-middle">
          {t("search_results.no_match")}
        </h2>
      )}
    </Table>
  );
}
