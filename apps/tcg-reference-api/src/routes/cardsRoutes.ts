import { Router } from "express";
import { setCard } from "../controllers/cardsController";

const router: Router = Router();

const cardsPath = "/v1/cards";

router.get(`${cardsPath}/:setCode/:cardNumber`, setCard);

export default router;