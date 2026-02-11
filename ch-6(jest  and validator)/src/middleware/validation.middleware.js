import { body, validationResult } from "express-validator";

async function validateResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

const registerUserValidation = () => {
  return [
    body("username").isString().isLength({ min: 3, max: 20 }),

    body("email").isEmail(),

    body("password")
      .isString()
      .isLength({ min: 6, max: 20 })
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
  ];
};


export { validateResult, registerUserValidation };
