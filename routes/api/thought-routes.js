const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");
 // /api/thoughts/
router.route("/").get(getAllThoughts).post(addThought);

// /api/thoughts/<thoughtId>
router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(removeThought);
router.route("/:thoughtId/reactions").put(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);
module.exports = router;
