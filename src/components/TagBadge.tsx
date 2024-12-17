import { Badge } from "react-bootstrap";

interface TagBadgeProps {
  tag: string;
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
  return (
    <h5>
      <Badge pill bg="info" className="hand-cursor">
        {tag}
      </Badge>
    </h5>
  );
};

export default TagBadge;
