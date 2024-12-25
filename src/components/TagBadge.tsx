import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface TagBadgeProps {
  tag: string;
  bg?: string;
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag, bg = "info" }) => {
  const navigate = useNavigate();
  return (
    <h5
      className="pointer me-3"
      onClick={() => navigate(`/search/${tag}/tags`)}
    >
      <Badge pill bg={bg} className="badge">
        {tag}
      </Badge>
    </h5>
  );
};

export default TagBadge;
