import { Router } from "express";
import { apiMetadata } from "../controllers/v1Controller";

const router: Router = Router();

const v1Path = "/v1";

router.get(v1Path, apiMetadata);

export default router;
