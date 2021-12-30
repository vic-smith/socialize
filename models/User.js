const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      required: true, 
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      default: 'Large'
    },
    toppings: [],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

// get total count of thoughts and reactionson retrieval
UserSchema.virtual("thoughtCount").get(function () {
  return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1, 0);
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

module.exports = User;
