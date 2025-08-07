import { validate } from '../middlewares/validate';
import { userSchema } from '../schemas/userSchema';

export const validateUser = validate(userSchema);
