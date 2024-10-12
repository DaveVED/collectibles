import {
  healthReadiness,
  healthLiveness,
} from "../controllers/healthController";
import { Router } from "express";

const router: Router = Router();

const healthPath = "/v1/health";

router.get(`${healthPath}/ready`, healthReadiness);
router.get(`${healthPath}/live`, healthLiveness);

export default router;
