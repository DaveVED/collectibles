import { Router } from "express";
import {
  setByCode,
  setByName,
  setCardsByCode,
  setCardsBySetName,
  setCardByCardCode,
  sets,
} from "../controllers/setsController";

const router: Router = Router();

const setsPath = "/v1/sets";

router.get(setsPath, sets);
router.get(`${setsPath}/code/:setCode`, setByCode);
router.get(`${setsPath}/code/:setCode/cards`, setCardsByCode);
router.get(`${setsPath}/name/:setName`, setByName);
router.get(`${setsPath}/name/:setName/cards`, setCardsBySetName);
router.get(`${setsPath}/name/:setName/cards/code/:cardCode`, setCardByCardCode)

export default router;
