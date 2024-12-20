import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { CurrentUserContext } from "../contexts/user/UserContext";
import { useTranslation } from "react-i18next";

interface LikesProps {
  likes: string[];
  handleLike: () => void;
}

const Likes: React.FC<LikesProps> = ({ likes, handleLike }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { t } = useTranslation();
  const handleDisabled = () => {
    return likes.includes(currentUser.id.toString());
  };
  return (
    <div className="d-flex align-items-center mt-4">
      {currentUser.name && (
        <Button
          variant="outline-primary"
          onClick={handleLike}
          disabled={handleDisabled()}
        >
          {t("template.likes.like")}
          <i className="bi bi-heart-fill ms-2" />
        </Button>
      )}
      <span className="ms-3">
        {likes.length}{" "}
        {likes.length === 1
          ? t("template.likes.like")
          : t("template.likes.likes")}
      </span>
    </div>
  );
};

export default Likes;
