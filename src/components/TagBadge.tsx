import { Badge } from "react-bootstrap";

interface TagBadgeProps {
  tag: string;
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
  return (
    <h5 className="pointer">
      <Badge pill bg="info">
        {tag}
      </Badge>
    </h5>
  );
};

export default TagBadge;
