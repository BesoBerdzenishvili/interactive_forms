import React, { useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { DarkModeContext } from "../../contexts/dark_mode/DarkModeContext";

interface DataItem {
  id: number;
  type: "text" | "paragraph" | "number" | "checkbox";
  title: string;
  description: string;
  answer: string | number | boolean;
  order: number;
}

const mockData: DataItem[] = [
  {
    id: 1,
    type: "text",
    title: "Hobby",
    description: "What's your hobby?",
    answer: "skydiving",
    order: 1,
  },
  {
    id: 2,
    type: "number",
    title: "Age",
    description: "How old are you?",
    answer: 25,
    order: 2,
  },
  {
    id: 3,
    type: "checkbox",
    title: "Pet Owner",
    description: "Do you own a pet?",
    answer: true,
    order: 3,
  },
  {
    id: 3,
    type: "checkbox",
    title: "Pet Owner",
    description: "Do you own a pet?",
    answer: true,
    order: 10,
  },
  {
    id: 4,
    type: "paragraph",
    title: "Favorite Book",
    description: "What is your favorite book?",
    answer: "1984",
    order: 4,
  },
  {
    id: 4,
    type: "paragraph",
    title: "Favorite Book",
    description: "What is your favorite book?",
    answer: "1984",
    order: 11,
  },
  {
    id: 4,
    type: "paragraph",
    title: "Favorite Book",
    description: "What is your favorite book?",
    answer: "Animal Farm",
    order: 12,
  },
  {
    id: 5,
    type: "number",
    title: "Age",
    description: "How old are you?",
    answer: 30,
    order: 5,
  },
  {
    id: 6,
    type: "checkbox",
    title: "Pet Owner",
    description: "Do you own a pet?",
    answer: false,
    order: 6,
  },
  {
    id: 7,
    type: "text",
    title: "Hobby",
    description: "What's your hobby?",
    answer: "reading",
    order: 7,
  },
  {
    id: 8,
    type: "text",
    title: "Hobby",
    description: "What's your hobby?",
    answer: "skydiving",
    order: 8,
  },
  {
    id: 9,
    type: "number",
    title: "Age",
    description: "How old are you?",
    answer: 25,
    order: 9,
  },
];

const Aggregation: React.FC = () => {
  const sortedData = [...mockData].sort((a, b) => a.order - b.order);
  const { darkMode } = useContext(DarkModeContext);

  const aggregateAnswers = (type: string, items: DataItem[]) => {
    if (type === "text" || type === "paragraph") {
      const frequencies: Record<string, number> = {};
      items.forEach((item) => {
        const answer = item.answer as string;
        frequencies[answer] = (frequencies[answer] || 0) + 1;
      });
      const sortedFrequencies = Object.entries(frequencies)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3);
      return sortedFrequencies
        .map(([answer, count]) => `${answer} (${count})`)
        .join(", ");
    }

    if (type === "number") {
      const numbers = items.map((item) => item.answer as number);
      const min = Math.min(...numbers);
      const max = Math.max(...numbers);
      const avg = (
        numbers.reduce((acc, num) => acc + num, 0) / numbers.length
      ).toFixed(0);
      return `Most Common: ${
        numbers.sort(
          (a, b) =>
            numbers.filter((num) => num === b).length -
            numbers.filter((num) => num === a).length
        )[0]
      }, Range: ${min}-${max}, Average: ${avg}`;
    }

    if (type === "checkbox") {
      const yesCount = items.filter((item) => item.answer === true).length;
      const noCount = items.filter((item) => item.answer === false).length;
      const total = yesCount + noCount;
      const yesPercentage = ((yesCount / total) * 100).toFixed(2);
      const noPercentage = ((noCount / total) * 100).toFixed(2);
      return `Yes: ${yesPercentage}% (${yesCount}), No: ${noPercentage}% (${noCount})`;
    }

    return "";
  };

  const groupedData = sortedData.reduce<Record<string, DataItem[]>>(
    (acc, item) => {
      if (!acc[item.title]) {
        acc[item.title] = [];
      }
      acc[item.title].push(item);
      return acc;
    },
    {}
  );
  return (
    <Container>
      {Object.entries(groupedData).map(([title, items]) => (
        <Row key={title} className="mb-4">
          <Col>
            <Card className={`${darkMode ? "bg-dark text-white" : ""}`}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-secondary">
                  <i>{items[0].description}</i>
                </Card.Subtitle>

                <Card.Text>{aggregateAnswers(items[0].type, items)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Aggregation;
