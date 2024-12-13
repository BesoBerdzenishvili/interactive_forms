import React from "react";
import { Form, Container, Card, Badge, Image } from "react-bootstrap";

interface Answer {
  id: number;
  type: "text" | "paragraph" | "number" | "checkbox";
  title: string;
  description: string;
  answer: string | number | boolean;
  order: number;
}

interface FormData {
  id: number;
  formTitle: string;
  description: string;
  topic: string;
  tags: string[];
  image?: string;
  username: string;
  email: string;
  createdAt: string;
}

const formData: FormData = {
  id: 1,
  formTitle: "my title",
  description: "describe my title",
  topic: "Testin QA",
  tags: ["a", "testing", "running"],
  image:
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
  username: "John Doe",
  email: "J@jj.jz",
  createdAt: "14/11/2024",
};

const answers: Answer[] = [
  {
    id: 1,
    type: "text",
    title: "Your Name",
    description: "Please provide your full name.",
    answer: "John Doe",
    order: 1,
  },
  {
    id: 2,
    type: "number",
    title: "Your Age",
    description: "Enter your age in years.",
    answer: 30,
    order: 2,
  },
  {
    id: 3,
    type: "checkbox",
    title: "Do you agree to the terms and conditions?",
    description: "Check the box if you agree.",
    answer: true,
    order: 3,
  },
  {
    id: 4,
    type: "paragraph",
    title: "Tell us about yourself",
    description: "Provide a brief description about yourself.",
    answer: "I am a software developer with 5 years of experience.",
    order: 4,
  },
  {
    id: 5,
    type: "text",
    title: "Favorite Programming Language",
    description: "What is your favorite programming language?",
    answer: "JavaScript",
    order: 5,
  },
];

const UserForm: React.FC = () => {
  // all we'll get from props is form id
  // and then fetch form data and questions from it
  return (
    <Container>
      {/* Form Header */}
      <Card className="mb-4">
        {formData.image && (
          <Image
            width={400}
            height={400}
            src={formData.image}
            alt={formData.formTitle}
            thumbnail
          />
        )}
        <Card.Title className="bg-primary text-white text-center rounded p-2 mt-2">
          {formData.formTitle}
        </Card.Title>
        <Card.Text>{formData.description}</Card.Text>
        <Card.Text>
          <strong>Topic:</strong> {formData.topic}
        </Card.Text>
        <Card.Text>
          <strong>Created By:</strong> {formData.username} ({formData.email})
        </Card.Text>
        <Card.Text>
          <strong>Created At:</strong> {formData.createdAt}
        </Card.Text>
        <Card.Text>
          <strong className="me-2">Tags:</strong>
          {formData.tags.map((tag, index) => (
            <Badge bg="primary" key={index} className="me-2">
              {tag}
            </Badge>
          ))}
        </Card.Text>
      </Card>

      {/* Form Questions */}
      <Form>
        {answers
          .sort((a, b) => a.order - b.order)
          .map((answer) => (
            <Card key={answer.id} className="mb-3 bg-secondary">
              <Card.Body>
                <Card.Title>{answer.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {answer.description}
                </Card.Subtitle>
                <Card.Text>
                  <i>
                    {answer.type === "checkbox"
                      ? answer.answer
                        ? "Yes"
                        : "No"
                      : answer.answer}
                  </i>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
      </Form>
    </Container>
  );
};

export default UserForm;
