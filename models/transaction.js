import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    personsInvoled: {
        type: Number,
        required: true,
    },
    transactionName: {
        type: String,
        required: true
    },
    persons: [{ name: String, amount: Number, userId: String }],
}, { timestamps: true });
const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;