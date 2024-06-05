import { DBbot, app as appClass } from "./DBbot";
import { REACT_APP_PATH } from "./DBbot/general/resources";
import 'dotenv/config';
import path from "path";

export const dbBot = new DBbot();
const reactPath = path.resolve(
    __dirname,
    REACT_APP_PATH[process.env.NODE_ENV ?? "production"]
);
export const app = new appClass(reactPath);
