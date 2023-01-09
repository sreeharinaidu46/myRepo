import express from "express";
import { getTransaction, addTransaction, updateTransaction, deleteTransaction } from "../controllers/Transactions.js";

const router = express.Router();

router.post("/addTransaction", addTransaction);
router.delete("/deleteTransaction/:id", deleteTransaction);
router.get("/getTransactions", getTransaction);
router.put("/updateTransaction/:id", updateTransaction);


export default router;