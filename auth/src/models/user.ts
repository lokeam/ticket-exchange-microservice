import mongoose from "mongoose";

interface UserAttributes {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    /*
      Note:
      Mongoose needs a capital S-string string constructor here,
      as opposed to TypeScript's lowercase s-string.
    */
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

/*
  Note:
  Build fn needed order to perform type checking with Mongoose.
*/
const buildUser = (attrs: UserAttributes) => {
  return new User(attrs);
};

export { User, buildUser };
