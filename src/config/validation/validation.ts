import { Schema } from "zod";
import { HTTPExecption } from "../../middlewares";

export const validate = async (schema: Schema, request: unknown) => {
  const result = await schema.safeParseAsync(request);

  if (result.success) {
    return result.data;
  } else {
    throw new HTTPExecption(400, result.error.errors[0].message);
  }
};
