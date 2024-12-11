import { Stack, Carousel, Table } from "react-bootstrap";
import TagBadge from "../common/TagBadge";

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
  tags: [
    "movies",
    "music",
    "education",
    "movies",
    "music",
    "education",
    "movies",
    "music",
    "education",
    "movies",
    "music",
    "education",
    "movies",
    "music",
    "education",
    "movies",
    "music",
    "education",
    "movies",
    "music",
    "education",
  ],
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
  return (
    <div className="d-flex flex-column align-items-center justify-content-evenly w-75 h-100 position-absolute top-50 start-50 translate-middle">
      {/* Tags Section */}
      <Stack direction="horizontal" gap={3} className="overflow-auto">
        {mock.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </Stack>

      {/* Gallery Section */}
      <Carousel className="w-50 h-50">
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
      <Table bordered variant="dark" hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Responses</th>
          </tr>
        </thead>
        <tbody>
          {mock.populars.map((item, index) => (
            <tr key={index}>
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
