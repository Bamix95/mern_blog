import { useCallback } from "react";
import { toast } from "sonner";
import { api } from "../lib/axios";

const usePosts = () => {
  const fetchAllPosts = useCallback(async () => {
    try {
      const res = await api.get("/posts");
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch posts.");
      return [];
    }
  }, []);

  const fetchPostBySlug = useCallback(async (slug) => {
    try {
      const res = await api.get(`/posts/${slug}`);
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Post not found.");
      return null;
    }
  }, []);

  const handleCreatePost = useCallback(async (data) => {
    try {
      const res = await api.post("/posts", data);
      if (res.data?.status === "success") {
        toast.success(res.data.message);
        return true;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create post.");
      return false;
    }
  }, []);

  const fetchMyPosts = useCallback(async () => {
    try {
      const res = await api.get("/posts/my-posts");
      return res.data.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch your posts.",
      );
      return [];
    }
  }, []);

  const handleDeletePost = useCallback(async (slug) => {
    try {
      const res = await api.delete(`/posts/${slug}`);
      if (res.data?.status === "success") {
        toast.success(res.data.message);
        return true;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete post.");
      return false;
    }
  }, []);

  const handleUpdatePost = useCallback(async (slug, data) => {
    try {
      const res = await api.patch(`/posts/${slug}`, data);
      if (res.data?.status === "success") {
        toast.success(res.data.message);
        return true;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update post.");
      return false;
    }
  }, []);
  const fetchPostForEdit = useCallback(async (slug) => {
    try {
      const res = await api.get(`/posts/edit/${slug}`);
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Post not found.");
      return null;
    }
  }, []);

  return {
    fetchAllPosts,
    fetchPostBySlug,
    handleCreatePost,
    fetchMyPosts,
    handleDeletePost,
    handleUpdatePost,
    fetchPostForEdit,
  };
};

export default usePosts;
