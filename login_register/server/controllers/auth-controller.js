import studentModel from '../models/student-model.js';
import dotenv from 'dotenv';
const result = dotenv.config({path: './server/.env'});
if (result.error) {
  throw result.error;
}

const register = async (req, res) => {
    const { name, email, password, branch, semester } = req.body;

    try {
        const userExist = await studentModel.findOne({ email: email });

        if (userExist) {
            throw new Error('UserAlreadyExists');
        }

        const employee = await studentModel.create({ name, email, password, branch, semester });
        res.json(employee);
    } catch (err) {
        if (err.message === 'UserAlreadyExists') {
            return res.status(409).json({ message: 'User already exists with this email.' });
        }
        res.status(500).json(err);
    }
}

const login = async (req, res) => {
    if (!process.env.JWT_SECRET_KEY) {
        console.error("JWT secret key is not set.");
        throw new Error("JWT secret key is not defined.");
    }

    try {
      const { email, password } = req.body;
  
      const userExist = await studentModel.findOne({ email });
      //console.log(userExist);
  
      if (!userExist) {
        return res.status(400).json({ message: "Invalid Credentials " });
      }
  
      // const user = await bcrypt.compare(password, userExist.password);
      const user = await userExist.comparePassword(password);
  
      if (user) {
        const token = await userExist.generateToken();
        console.log("Token created: ", token); // Log statement for token creation
        res.status(200).json({
          msg: "Login Successful",
          token: token,
          userId: userExist._id.toString(),
          user: {name: userExist.name, email: userExist.email},
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json("internal server error");
    }
  };

const user = async (req, res) => {
    try {
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(`error from the user route ${error}`);
    }
};

const authControllers = { login, register, user };
export default authControllers;