import fs from 'fs'
import path from 'path'
export const privateKey = fs.readFileSync(path.join(__dirname, "../../private.key"))