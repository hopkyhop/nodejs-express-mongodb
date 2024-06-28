import * as uuid from "uuid";
import * as path from "path";
import { UploadedFile } from "express-fileupload";

class FileService {
  saveFile(file: UploadedFile) {
    try {
      const fileName = uuid.v4() + path.extname(file.name);
      const filePath = path.resolve("static", fileName);
      file.mv(filePath);
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FileService();
