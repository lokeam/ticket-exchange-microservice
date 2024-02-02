import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttributes {
  email: string;
  password: string;
}

/*
  Note:
  Second interface needed to describe properties for User Model.
*/
interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttributes): UserDocument;
}

/*
  Note: UserDocument needed to describe what props a single user
  possesses.
*/
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

/*
  Note:
  Mongoose needs a capital S-string string constructor here,
  as opposed to TypeScript's lowercase s-string.
*/
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

/*
  Note:
  Oldschool middleware mongoose fn due to lack of async/await support.
  Function declaration used so that we don't override the value of 'this'
  as opposed to UserDocument.
*/
userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);

    done();
  }
});

/*
  Note:
  TypeScript won't allow a build fn to be placed on statics
  method without an additional interface describing User Model
  props.
*/
userSchema.statics.build = (attrs: UserAttributes) => {
  return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
