const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/],
    },
    friends: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],

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
    },
  }
);


UserSchema.virtual("friendsCount").get(function () {
  return this.friends.length ;
});

// create the User model using the UserSchema
const User = model("User", UserSchema);

module.exports = User;
