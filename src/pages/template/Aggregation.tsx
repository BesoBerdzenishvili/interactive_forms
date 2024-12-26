import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";
import aggregateAnswers from "../../utils/aggregateAnswers";
import supabase from "../../config/supabase";
import { Answer } from "../../types/types";
import { useTranslation } from "react-i18next";

interface AggregationProps {
  formId: number;
}

const Aggregation = ({ formId }: AggregationProps) => {
  const { darkMode } = useContext(DarkModeContext);
  const [answers, setAnswers] = useState<Answer[]>();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAnswers = async () => {
      const { data, error } = await supabase
        .from("answers")
        .select()
        .eq("form_id", formId)
        .order("order");
      if (error) {
        console.log(error);
      }
      if (data) {
        setAnswers(data);
      }
    };
    fetchAnswers();
  }, []);

  const groupedData = (answers ?? []).reduce<Record<string, Answer[]>>(
    (acc, item) => {
      if (!acc[item.title]) {
        acc[item.title] = [];
      }
      acc[item.title].push(item);
      return acc;
    },
    {}
  );

  const totalAnswers = new Set(answers?.map((i) => i.send_id)).size;

  return (
    <Container>
      <h3 className="mb-4">
        {t("template.aggregation.total_users", {
          totalAnswers: totalAnswers,
        })}
      </h3>
      {Object.entries(groupedData).map(([title, items]) => (
        <Row key={title} className="mb-4">
          <Col>
            <Card className={`${darkMode ? "bg-dark text-white" : ""}`}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-secondary">
                  <i>{items[0].description}</i>
                </Card.Subtitle>

                <Card.Text>
                  {answers && aggregateAnswers(items[0].type, items)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Aggregation;
