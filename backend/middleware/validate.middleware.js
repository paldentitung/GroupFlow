const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((err) => {
      return {
        field: err.path[0],
        message: getCleanMessage(err),
      };
    });

    return res.status(400).json({
      success: false,
      message: formattedErrors[0].message,
      errors: formattedErrors,
    });
  }

  req.validatedData = result.data;
  next();
};

export default validate;
const getCleanMessage = (err) => {
  switch (err.code) {
    case "invalid_type":
      return `${err.path[0]} is required`;

    case "too_small":
      return `${err.path[0]} is too short`;

    case "too_big":
      return `${err.path[0]} is too long`;

    case "invalid_string":
      return `${err.path[0]} is invalid`;

    default:
      return err.message;
  }
};
