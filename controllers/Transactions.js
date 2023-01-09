import mongoose from "mongoose";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";
export const getTransaction = async(req, res) => {
    try {
        const allUsers = await Transaction.find();
        const allUserDetails = [];
        allUsers.forEach((users) => {
            allUserDetails.push(users);
        });
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const addTransaction = async(req, res) => {
    try {
        let { transactionName, category, amount, personsInvoled, persons, Id, currentUSER } =
        req.body;
        const newTransaction = await Transaction.create({
            category,
            amount,
            persons,
            personsInvoled,
            transactionName,
            userId: Id
        });
        await newTransaction.save();
        console.log(personsInvoled, persons, Id);
        const users = await User.findOne({ _id: Id });

        let newPersons = [...persons];

        users.remainingAmount = users.remainingAmount - amount;
        users.amountSpent = users.totalAmount - users.remainingAmount;
        if (persons.length > 0) {
            users.personYouOwe.map((owe, index) => {
                persons.map((data, idx) => {
                    if (data.userId === owe.userId) {
                        let amountRem = owe.amount - data.amount;
                        if (amountRem === 0) {
                            users.personYouOwe.splice(index, 1);
                            persons.splice(idx, 1);
                        } else if (amountRem < 0) {
                            users.personYouOwe.splice(index, 1);
                            persons[idx] = { name: data.name, amount: -amountRem, userId: data.userId }
                                //persons[idx] = {...data, amount: -amountRem };
                        } else {
                            users.personYouOwe[index] = { name: owe.name, amount: amountRem, userId: owe.userId }
                            console.log("sreeharinaidu", users.personYouOwe[index])
                                // users.personYouOwe[index] = {
                                //     ...owe,
                                //     amount: amountRem,
                                // };
                            persons.splice(idx, 1);
                        }
                    }
                });
            });
            // console.log("personYouOw", users)
            if (users.personWhoOwesYou.length > 0) {
                persons.map((data, idx) => {
                    let value = 0;
                    users.personWhoOwesYou.map((owe, index) => {
                        if (data.userId === owe.userId) {
                            // console.log("oweheree", owe)
                            users.personWhoOwesYou[index] = {
                                name: data.name,
                                userId: data.userId,
                                amount: data.amount + owe.amount,
                            };
                            console.log("debug", users.personWhoOwesYou[index])
                            value = 1;
                        } else if (
                            index + 1 === users.personWhoOwesYou.length &&
                            value === 0
                        ) {
                            console.log("datahereee", data)
                            users.personWhoOwesYou.push(data);
                        }
                    });
                });
            } else {
                users.personWhoOwesYou = [...users.personWhoOwesYou, ...persons];
            }
            // console.log("personwhoOwsYou", users)
        }
        if (newPersons.length > 0) {
            newPersons.map(async(userr, idxx) => {
                const newUser = await User.findOne({ _id: userr.userId });
                let dummyUser = {...currentUSER }
                let jansi = 0
                newUser.personWhoOwesYou.map((val, index) => {
                    if (val.userId === dummyUser.userId) {
                        let remainingAmount = val.amount - dummyUser.amount;
                        if (remainingAmount === 0) {
                            newUser.personWhoOwesYou.splice(index, 1);
                            dummyUser = {}
                            jansi = 1
                        } else if (remainingAmount < 0) {
                            newUser.personWhoOwesYou.splice(index, 1);
                            dummyUser = { name: currentUSER.name, userId: currentUSER.userId, amount: -remainingAmount };
                            jansi = 1
                        } else {
                            newUser.personWhoOwesYou[index] = {
                                name: val.name,
                                userId: val.userId,
                                amount: remainingAmount,
                            };
                            dummyUser = {};
                            jansi = 1
                        }
                    }
                    if (jansi === 0 && index + 1 === newUser.personWhoOwesYou.length) {
                        console.log("hereeeeeeeeeeeeeee", dummyUser)
                        newUser.personWhoOwesYou.push(dummyUser)
                    }

                });
                // console.log("newPersons", newUser)
                // console.log("dummyUserAfter", dummyUser)
                if (newUser.personYouOwe.length > 0) {
                    if (dummyUser) {
                        let value1 = 0;
                        newUser.personYouOwe.map((val, index) => {
                            if (val.userId === dummyUser.userId) {
                                newUser.personYouOwe[index] = {
                                    name: val.name,
                                    userId: val.userId,
                                    amount: dummyUser.amount + val.amount
                                };
                                console.log("debb", newUser.personYouOwe[index])
                                value1 = 1
                            } else if (value1 === 0 && index + 1 === newUser.personYouOwe.length) {
                                console.log("1234", dummyUser)
                                newUser.personYouOwe.push(dummyUser)
                            }
                        });
                    }
                } else {
                    console.log("about to go dummyusr else ")
                    if (Object.keys(dummyUser).length > 0) {
                        console.log("sree", dummyUser)
                        newUser.personYouOwe.push(dummyUser);
                    }
                }
                // console.log("newPersonsyouOwe", newUser)
                await newUser.save();
            });

        }

        await users.save();
        res.status(200).json({});
    } catch (error) {
        console.log("error", error);
        res.status(500).json("something went wrong...");
    }
};

export const updateTransaction = async(req, res) => {
    const { id: _id } = req.params;

    const { category, amount, transactionName } = req.body;

    try {
        const updatedProfile = await Transaction.findByIdAndUpdate(
            _id, {
                $set: {
                    category: category,
                    amount: amount,
                    transactionName: transactionName
                },
            }
        );
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
};

export const deleteTransaction = async(req, res) => {
    const { id: _id } = req.params;
    try {
        await Transaction.findByIdAndRemove(_id);
        res.status(200).json({ message: "Successfully deleted.." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// export const updateTransaction =as