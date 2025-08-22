import { body } from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("User is required")
            .isLowercase()
            .withMessage("User name must be in lowercase")
            .isLength({ min: 3 })
            .withMessage("User name must be 3 characters long"),
        body("password").trim().notEmpty().withMessage("Password is required"),
        body("FullName").optional().trim(),
    ];
};

const userLoginValidator = () => {
    return [
        body("email").optional().isEmail().withMessage("Email in invalid"),
        body("password").notEmpty().withMessage("password is required"),
    ];
};

export { userRegisterValidator, userLoginValidator };
