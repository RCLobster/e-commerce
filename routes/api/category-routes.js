const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, as: 'products' }]
  });
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
  });
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryId = req.params.id;
  const { category_name } = req.body;
  
  try {
    const updatedCategory = await Category.update({ category_name }, {
      where: { id: categoryId }
    });

    if(!updatedCategory){
      res.status(404).json({message: "No category with that id."});
      return;
    }
    res.status(200).json(updatedCategory);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroyedCategory = await Category.destroy({where: { id: req.params.id }});
    if(!destroyedCategory){
      res.status(404).json({message: "No category with that id."});
    }
    
    res.status(200).json(destroyedCategory);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
