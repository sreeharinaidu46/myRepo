import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    amountSpent: {
        type: Number,
        required: true
    },
    remainingAmount: {
        type: Number,
        required: true
    },
    personYouOwe: [
        { userId: String, name: String, amount: Number },
    ],
    personWhoOwesYou: [
        { userId: String, name: String, amount: Number },
    ]
}, { timestamps: true });
const User = mongoose.model("User", studentSchema);
export default User;