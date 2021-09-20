const Favorite = require('../models/favoritesModel');
const catchAsync = require('../utils/catchAsync');

const create = catchAsync(async (req, res) => {
  const {
    guitar, user,
  } = req.body;

  const newFavorite = await Favorite.create(req.body);

  res.status(200).json({
    status: 'success',
    newFavorite,
  });
});

const getAll = catchAsync(async (req, res) => {
  let filter = {};
  if (req.params.email) filter = { user: req.params.email };
  if (req.params.id) filter = { guitar: req.params.id };

  const favorites = await Favorite.find(filter);
  return res.status(200).json({ status: 'success', favorites });
});

const deleteFavorite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await Favorite.findByIdAndDelete(id);
  return res.status(200).json({ status: 'success', response });
});

module.exports = {
  create,
  getAll,
  deleteFavorite,
};
