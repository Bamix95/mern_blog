import { ZodError } from "zod";

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues.map((e) => ({
        field: e.path.slice(1).join("."),
        message: e.message,
      }));

      return res.status(400).json({
        status: "fail",
        message: "Validation failed",
        errors,
      });
    }

    next(error);
  }
};
