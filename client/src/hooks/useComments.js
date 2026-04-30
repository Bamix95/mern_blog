import { useState, useCallback } from "react";
import { toast } from "sonner";
import { api } from "../lib/axios";

const useComments = (slug) => {
  const [comments, setComments] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await api.get(`/posts/${slug}/comments`);
      setComments(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load comments.");
    } finally {
      setIsFetching(false);
    }
  }, [slug]);

  const handleAddComment = async (body, onSuccess) => {
    try {
      setIsSubmitting(true);
      const res = await api.post(`/posts/${slug}/comments`, { body });
      if (res.data?.status === "success") {
        setComments((prev) => [res.data.data, ...prev]);
        onSuccess?.();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await api.delete(`/comments/${commentId}`);
      if (res.data?.status === "success") {
        setComments((prev) => prev.filter((c) => c._id !== commentId));
        toast.success("Comment deleted");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete comment.",
      );
    }
  };

  return {
    comments,
    isFetching,
    isSubmitting,
    fetchComments,
    handleAddComment,
    handleDeleteComment,
  };
};

export default useComments;
