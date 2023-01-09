import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from 'bcrypt'
export const signup = async(req, res) => {
    console.log("hereeeeeeeeeee")
    const { name, password } = req.body;
    try {
        const existinguser = await User.findOne({ name });

        if (existinguser) {
            return res.status(404).json({ message: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            name,
            password: hashedPassword,
            totalAmount: 30000,
            amountSpent: 0,
            remainingAmount: 30000,
            personYouOwe: [],
            personWhoOwesYou: []
        });

        res.status(200).json(newUser);
    } catch (error) {
        console.log("errr", error)
        res.status(500).json("something went wrong...");
    }
};

export const login = async(req, res) => {
    const { name, password } = req.body;
    try {
        const existinguser = await User.findOne({ name });

        if (!existinguser) {
            return res.status(404).json({ message: "user don't exist" });
        }

        const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
        if (!isPasswordCrt) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json(existinguser);
    } catch (error) {
        res.status(500).json("something went wrong...");
    }
};
export const getAllUsers = async(req, res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails = [];
        allUsers.forEach((users) => {
            allUserDetails.push({
                _id: users._id,
                name: users.name,
                totalAmount: users.totalAmount,
                remainingAmount: users.remainingAmount,
                personYouOwe: users.personYouOwe,
                personWhoOwesYou: users.personWhoOwesYou,
                amountSpent: users.amountSpent
            });
        });
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateProfile = async(req, res) => {
    const { id: _id } = req.params;

    const { name, totalAmount, amountSpent, remainingAmount, personYouOwe, personWhoOwesYou } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("user unavailable");
    }

    try {
        const updatedProfile = await User.findByIdAndUpdate(
            _id, {
                $set: { name: name, totalAmount: totalAmount, amountSpent: amountSpent, personYouOwe: personYouOwe, personWhoOwesYou: personWhoOwesYou, remainingAmount: remainingAmount },
            }, { new: true }
        );
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
};
export const getCurrentUser = async(req, res) => {
    const { id: _id } = req.params;
    console.log(_id)
    try {
        const data = await User.findById(_id)
        console.log("dataa", data)
        res.send(data)
    } catch (err) {
        console.log("efwfewsj")
        res.send({ message: err.message })
    }
}