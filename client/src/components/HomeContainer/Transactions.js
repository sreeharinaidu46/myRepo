import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Icon, Table,Dropdown } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Child from "../Transactions/Child";
import moment from "moment";
import "react-dropdown/style.css";
import "./Transactions.css";
import { fetchAllUsers,getCurrentUser } from "../../actions/Auth";
import { allTransactions, deleteTransaction } from "../../actions/Transaction";
import { setCurrentUser } from "../../actions/currentUser";
import OpenView from "../Transactions/OpenView";
import Moment from "react-moment";
import { all } from "axios";
import { get } from "mongoose";
const Transactions = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [myCurrentTransaction, setCurrentTransaction] = useState({});
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem("Profile");
  let currentUser = {};
  if (isAuth) {
    currentUser = JSON.parse(isAuth);
  }
  useEffect(() => {
    // dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(fetchAllUsers());
    dispatch(allTransactions());
    dispatch(getCurrentUser(currentUser._id))
    

  }, [dispatch]);
  const users = useSelector((state) => state.usersReducer);
  const allTransaction = useSelector((state) => state.transactionReducer);
  const currentUserrr=useSelector((state) => state.getCurrentUser);
  console.log("all Transaction", allTransaction,currentUserrr);
  
  let options = [];
  if (users) {
    users.filter((val) => {
      if (currentUser._id != val._id) {
        options.push({ key: val.name, text: val.name, value: val._id });
      }
    });
  }
  let catagOpt = [
    { key: "shopping", text: "shopping", value: "shopping" },
    { key: "restaurant", text: "restaurant", value: "restaurant" },
    { key: "games", text: "games", value: "games" },
    { key: "cinema", text: "cinema", value: "cinema" },
    { key: "others", text: "others", value: "others" },
  ];
  let transaction = [];
  if (allTransaction.length > 0) {
    allTransaction.map((val, index) => {
      if (
        val.userId === currentUser._id &&
        moment(val.createdAt).format("MMM Do YY") ===
          moment(startDate).format("MMM Do YY")
      ) {
        if (category != "") {
          if (val.category === category) {
            transaction.push(val);
          }
        } else {
          transaction.push(val);
        }
      }
    });
  }
  const defaultOption = options[0];
  const calledCancel = () => {
    dispatch(allTransactions());
    dispatch(getCurrentUser(currentUser._id))
    setOpenModal(false);
    setIsAdd(false);
    setIsEdit(false);
    setIsView(false);
  };
  const addTransactionButtonHandler = () => {
    setIsAdd(true);
    setOpenModal(true);
  };
  const deleteIconHandler = (index) => {
    console.log("deleteddddddddd", index);
    dispatch(deleteTransaction(index));
    dispatch(allTransactions());
  };
  const viewIconHandler = (val) => {
    setCurrentTransaction(val);
    setIsView(true);
    setOpenModal(true);
  };
  const editIconHandler = (val) => {
    setCurrentTransaction(val);
    setIsEdit(true);
    setOpenModal(true);
  };
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };
  const viewUserHandler = () => {
    setOpenViewModal(true);
  };
  const dateSetHandler = (date) => {
    console.log(
      "dateee",
      moment(date).format("MMM Do YY") ===
        moment(currentUser.createdAt).format("MMM Do YY")
    );
    setStartDate(date);
  };
  const onChangeCategory = (e, data) => {
    console.log("asbadh", data);
    setCategory(data.value);
  };

  return (
    <div>
      <nav>
        <div className="leftNavbar">
          <div style={{ marginRight: "auto" }}>
            {currentUser && currentUser.name}
          </div>
          <button className={"rule-btn2"} onClick={viewUserHandler}>
            viewUser
          </button>
          <div>Total amount:{currentUser && currentUser.totalAmount}</div>
          <div>Amount spent:{currentUser && currentUser.amountSpent}</div>
          <div>
            Remaining amount:{currentUser && currentUser.remainingAmount}
          </div>
          <div style={{ paddingRight: "10px" }}>
            <button className={"rule-btn1"} onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "35px",
          margin: "0",
        }}
      >
        Transactions
      </h2>
      <div>
        <div className="filtering-tab">
          <p className="p-tag-styles">FilterBy :</p>
          <div className="transactions-topdiv">
            <div className="date-selection-class">
              <DatePicker
                selected={startDate}
                onChange={(date) => dateSetHandler(date)}
              />
            </div>
            <div className="adduser-input">
              <Dropdown
                placeholder="Category"
                fluid
                selection
                options={catagOpt}
                onChange={(e, data) => onChangeCategory(e, data)}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "10px", padding: "20px" }}>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Transaction ID</Table.HeaderCell>
                <Table.HeaderCell>Transaction Name</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>View</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {transaction.map((val, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{val.transactionName}</Table.Cell>
                    <Table.Cell>
                      <Moment format="YYYY/MM/DD">{val.createdAt}</Moment>
                    </Table.Cell>
                    <Table.Cell>{val.category}</Table.Cell>
                    <Table.Cell>{val.amount}</Table.Cell>

                    <Table.Cell>
                      <Icon name="eye" onClick={() => viewIconHandler(val)} />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        name="pencil"
                        onClick={() => editIconHandler(val)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        name="trash alternate outline"
                        onClick={() => deleteIconHandler(val._id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="6">
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    primary
                    size="small"
                    onClick={() => addTransactionButtonHandler()}
                  >
                    <Icon name="user" /> Add Transaction
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </div>
      {openModal === true && (
        <Child
          openModal={openModal}
          options={options}
          myName="Add Transaction"
          onCancel={() => calledCancel()}
          id={currentUser._id}
          name={currentUser.name}
          currentTransaction={myCurrentTransaction}
          isAdd={isAdd}
          isEdit={isEdit}
          isView={isView}
        />
      )}
      {openViewModal === true && (
        <OpenView
          onCancel={() => setOpenViewModal(false)}
          openViewModal={openViewModal}
          userData={currentUserrr}
        />
      )}
    </div>
  );
};

export default Transactions;
