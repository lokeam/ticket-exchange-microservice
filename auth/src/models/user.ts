import mongoose from "mongoose";
import { PasswordManager } from "../services/password";

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
  },
});

/*
  Note:
  Proof of concept to sanitize the data, deleting password, version key and
  remap id property. Ideally it would be better placed in view-level logic
  to create a static service Class or something else to propertly format the user.
*/
userSchema.set('toJSON', {
  transform(doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
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
    const hashed = await PasswordManager.toHash(this.get('password'));
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
