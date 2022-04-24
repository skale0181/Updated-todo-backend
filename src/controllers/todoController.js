const express = require("express");

const Todo = require("../models/todoModel");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    // console.log(req.user, req.user._id);
    // console.log(req.headers);
    //  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    //    new: true,
    //  });
    // console.log(req.body);
    let temp = req.body.subtask;
    // const user_id = req.user._id;
    const todo = await Todo.create(
      {
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        subtasks: temp,
        status: req.body.status,
        tags: {
          official:req.body.tags.official,  
          personal: req.body.tags.personal,
          others: req.body.tags.others,  
        },
        date: req.body.date,
        
      }
      // {
      //   new: true,
      // }
    );

    return res.status(200).json(todo);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // console.log(req.params.id);

    const todo = await Todo.find({ user_id: { $eq: req.params.id } })
      .lean()
      .exec();
    console.log(todo);
    return res.send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", authenticate, async (req, res) => {
  try {
    // console.log(req.params.id);

    const todo = await Todo.find({ user_id: { $eq: req.user._id } })
      .lean()
      .exec();
    console.log(todo);
    return res.send(todo);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     console.log(req.params.id);

//     const bag = await Bag.findByIdAndDelete(req.params.id).lean().exec();
//     console.log(bag);
//     return res.send(bag);
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });

module.exports = router;
