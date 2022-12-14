const postService = require('../services/post.service');
const errorMap = require('../utils/errorMap');

const createPost = async (req, res) => {
  const { user, body } = req;
  const { type, message } = await postService.createPost(body, user);

  if (type) return res.status(errorMap.setError(type)).json({ message });

  res.status(201).json(message);
};

const getAllPosts = async (_req, res) => {
  const posts = await postService.getAllPosts();
  res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);

  if (!post) res.status(404).json({ message: 'Post does not exist' });

  res.status(200).json(post);
};

const getPostBySearch = async (req, res) => {
  const { q: searchTerm } = req.query;
  console.log('chamou o controller');
  const postsFound = await postService.getPostBySearch(searchTerm);
  res.status(200).json(postsFound);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { body, user } = req;

  const { type, message } = await postService.updatePost(id, body, user);
  if (type) return res.status(errorMap.setError(type)).json({ message });

  res.status(200).json(message);
};

const excludePost = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  const { type, message } = await postService.excludePost(userId, Number(id));
  if (type) return res.status(type).json({ message });
  res.status(204).end();
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostBySearch,
  updatePost,
  excludePost,
};