import { Router } from "express";
import { FileController } from "../controllers";
import { authMiddleware, uploadMiddleware } from "../middleware";

export const createFileRouter = (fileController: FileController): Router => {
  const router = Router();

  router.post(
    "/upload",
    authMiddleware,
    uploadMiddleware.single("file"),
    fileController.upload
  );
  router.get("/list", authMiddleware, fileController.getList);
  router.get("/:id", authMiddleware, fileController.getById);
  router.get("/download/:id", authMiddleware, fileController.download);
  router.put(
    "/update/:id",
    authMiddleware,
    uploadMiddleware.single("file"),
    fileController.update
  );
  router.delete("/delete/:id", authMiddleware, fileController.delete);

  return router;
};
