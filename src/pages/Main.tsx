import { Stack, Carousel, Table } from "react-bootstrap";
import TagBadge from "../components/TagBadge";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../contexts/dark_mode/DarkModeContext";

interface PopularItem {
  title: string;
  author: string;
  responses: number;
}

interface MockData {
  tags: string[];
  image_urls: string[];
  populars: PopularItem[];
}

const mock: MockData = {
  tags: ["movies", "music", "education"],
  image_urls: [
    "https://media.istockphoto.com/id/2184389445/photo/woman-with-curly-hair-taking-selfie.jpg?s=1024x1024&w=is&k=20&c=xzz8yWlGib6OYqvVz8uutbrVYwb4EsI6Zgk22Wq-wEU=",
    "https://media.istockphoto.com/id/1360401313/photo/summer-beach-holiday-travel-background-palm-tree-with-chair-and-inflatable-ring-on-sand.jpg?s=1024x1024&w=is&k=20&c=6ul7SJIYT5652F0GnPtD24JAQPfD8b0lgl4TpSZQwuY=",
    "https://media.istockphoto.com/id/1356990969/photo/young-woman-from-the-60s-sitting-in-a-vintage-ball-chair-her-rotary-dial-telephone-of-the.jpg?s=1024x1024&w=is&k=20&c=CaX_G1NFhsdGSgVWJNMIHaG4GEehs5GaxOWcwMkxwZY=",
  ],
  populars: [
    {
      title: "my title 1",
      author: "John Doe",
      responses: 74,
    },
    {
      title: "my title 2",
      author: "Indiana Jones",
      responses: 45,
    },
    {
      title: "my title 3",
      author: "Jane Doe",
      responses: 34,
    },
    {
      title: "my title 3",
      author: "Jane Doe",
      responses: 34,
    },
    {
      title: "my title 3",
      author: "Jane Doe",
      responses: 34,
    },
  ],
};

export default function Main() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  // figure out other way to center main
  // position absolute causes lot's of trouble (hits header, on mobile version hits burger menu)
  return (
    <div className="d-flex flex-column mt-5 align-items-center justify-content-evenly w-75 h-100 position-absolute top-50 start-50 translate-middle">
      {/* Tags Section */}
      <Stack direction="horizontal" gap={3} className="overflow-auto mt-5">
        {mock.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </Stack>

      {/* Gallery Section */}
      <Carousel className="w-50 h-50">
        {/* add navigate here as well - when user clicks on image should navigate to template id */}
        {mock.image_urls.map((image_url, index) => (
          <Carousel.Item key={index}>
            <img
              src={image_url}
              alt={`Slide ${index + 1}`}
              className="img-fluid"
            />
            <Carousel.Caption>
              <h3>{`Slide ${index + 1}`}</h3>
              <p>Sample description for slide {index + 1}.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Table Section */}
      {/* for popular list:
        1. order templates by filled_forms ascebding
        2. fetch first 5 items */}
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
            <th>{t("main.tab.author")}</th>
            <th>{t("main.tab.responses")}</th>
          </tr>
        </thead>
        <tbody>
          {mock.populars.map((item, index) => (
            <tr key={index} onClick={() => navigate("/template/1")}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.responses}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
