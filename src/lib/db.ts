import { nextAuthClient, supabase } from "./supabase";

// Users
export const getUser = async (id: string) => {
  const { data } = await nextAuthClient.schema("next_auth").from("users").select("*").eq("id", id).single();
  return data;
}

export const getUsers = async () => {
  const { data } = await nextAuthClient.schema("next_auth").from("users").select("*");
  return data;
}

export const getUserByEmail = async (email: string) => {
  const { data } = await nextAuthClient.schema("next_auth").from("users").select("*").eq("email", email).single();
  return data;
}

// Posts
export const getPost = async (id: string) => {
  const { data } = await supabase.from("posts").select("*").eq("id", id).single();
  return data;
}

export const getPosts = async () => {
  const { data } = await supabase.from("posts").select("*");
  return data;
}

export const getPostsForUser = async (userId: string) => {
  const { data } = await supabase.from("posts").select("*").eq("userId", userId);
  return data;
}


// Chats
export const getChat = async (id: string) => {
  const { data } = await supabase.from("chats").select("*").eq("id", id).single();
  return data;
}

export const getChats = async () => {
  const { data } = await supabase.from("chats").select("*");
  return data;
}

export const getChatsForUser = async (userId: string) => {
  const { data } = await supabase.from("chats").select("*").eq("userId", userId);
  return data;
}


// Comments

export const getComment = async (id: string) => {
  const { data } = await supabase.from("comments").select("*").eq("id", id).single();
  return data;
}

export const getComments = async () => {
  const { data } = await supabase.from("comments").select("*");
  return data;
}

export const getCommentsForUser = async (userId: string) => {
  const { data } = await supabase.from("comments").select("*").eq("userId", userId);
  return data;
}

export const getCommentsForPost = async (postId: string) => {
  const { data } = await supabase.from("comments").select("*").eq("postId", postId).order("createdAt", { ascending: false });
  return data;
}


