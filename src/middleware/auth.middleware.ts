import jwt from 'express-jwt';
import { tokenSecret } from '../.env/config';


export const auth = jwt({secret: tokenSecret});