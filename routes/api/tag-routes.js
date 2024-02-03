const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, as: 'tag_product' }]
  });
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: 'tag_product' }]
  });
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  const tagId = req.params.id;
  const { tag_name } = req.body;
  
  try {
    const updatedTag = await Tag.update({ tag_name }, {
      where: { id: tagId }
    });

    if(!updatedTag){
      res.status(404).json({message: "No tag with that id."});
      return;
    }
    res.status(200).json(updatedTag);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const destroyedTag = await Tag.destroy({where: { id: req.params.id }});
    if(!destroyedTag){
      res.status(404).json({message: "No tag with that id."});
    }
    
    res.status(200).json(destroyedTag);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
