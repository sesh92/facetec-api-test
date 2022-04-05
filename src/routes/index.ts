import express from "express";
import facetecRouter from "./facetec";

const router = express.Router();

router.use("/facetec", facetecRouter);

router.use((_, res) => {
  res.status(404).json({ error: "page not found" });
});

export default router;
