import { useContext, useEffect, useState } from "react";
import { Comment as CommentType } from "../../types/types";
import { Button, Form, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { CurrentUserContext } from "../../contexts/user/UserContext";
import Comment from "../../components/Comment";
import supabase from "../../config/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";

interface CommentsProps {
  formId: number;
}

export default function Comments({ formId }: CommentsProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const { t } = useTranslation();
  const { currentUser } = useContext(CurrentUserContext);
  let commentsChannel: RealtimeChannel | null = null;

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase.from("comments").select("*");
      if (data) {
        setComments(
          // do it like that in other places too (questions and answers)
          data.filter((comment: CommentType) => comment.form_id === formId)
        );
      }
      if (error) {
        console.log(error);
      }
    };
    fetchComments();

    commentsChannel = supabase
      .channel("comments-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `form_id=eq.${formId}`, // Filter for comments of the specific form
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setComments((prevComments) => [
                ...prevComments,
                payload.new as CommentType,
              ]);
              break;
            case "UPDATE":
              setComments((prevComments) =>
                prevComments.map((comment) =>
                  comment.id === payload.new.id
                    ? (payload.new as CommentType)
                    : comment
                )
              );
              break;
            case "DELETE":
              setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    return () => {
      if (commentsChannel) {
        supabase.removeChannel(commentsChannel);
      }
    };
  }, [formId]);

  const handleAddComment = async () => {
    const { error } = await supabase
      .from("comments")
      .insert({
        form_id: formId,
        author_id: currentUser.id,
        text: newComment,
      })
      .select();

    if (error) {
      console.error("Error adding comment:", error);
    }
    setNewComment("");
  };

  return (
    <div className="mt-5">
      <h4>
        {comments.length} {t("template.comments.title")}:
      </h4>
      <ListGroup className="my-4">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </ListGroup>

      {currentUser.name && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              className="w-sm-50"
              placeholder={t("template.comments.placeholder")}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddComment}>
            {t("template.comments.add_button")}
          </Button>
        </Form>
      )}
    </div>
  );
}
