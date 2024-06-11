import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    branch: { type: String, required: true },
    semester: { type: String, required: true },
    subjects: [{ type: String, required: false, default: []}],
    subNum: { type: Number, required: true, default: 0}
});

studentSchema.pre("save", async function (next) {
    // console.log("pre method", this);
    const user = this;
  
    if (!user.isModified("password")) {
      next();
    }

    try {
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(user.password, saltRound);
      user.password = hash_password;
    } catch (error) {
      next(error);
    }
});

// compare the password
studentSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

studentSchema.methods.generateToken = async function () {
    try {
      return jwt.sign(
        {
          userId: this._id.toString(),
          email: this.email
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );
    } catch (error) {
      console.error(error);
    }
};

const studentModel = mongoose.model("Employee", studentSchema);
export default studentModel;
