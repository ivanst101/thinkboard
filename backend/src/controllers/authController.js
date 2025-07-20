import User from "../models/User.js";
import jwt from "jsonwebtoken";

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "Incorrect email!") {
    errors.email = "That email is not registered!";
  }

  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect!";
  }

  if (err.code === 11000) {
    errors.email = "That email is already registered!";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

export function signup_get(req, res) {
  res.send("signup");
}

export async function signup_post(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

export function login_get(req, res) {
  res.send("login");
}

export async function login_post(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge,
    });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}
