import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Grid,
  Dropdown,
  Input,
  Checkbox,
  Button,
  Table
} from "semantic-ui-react";
import { IoClose } from "react-icons/io5";
import { propTypes } from "react-bootstrap/esm/Image";
import {
  addTransaction,
  allTransactions,
  updateTransaction,
} from "../../actions/Transaction";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
const Child = (props) => {
  const [withSplit, setSplit] = useState(false);
  const [people, setPeople] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionName, setTransName] = useState("");
  const dispatch = useDispatch();
  let categoryOptions = [
    { key: "shopping", text: "shopping", value: "shopping" },
    { key: "restaurant", text: "restaurant", value: "restaurant" },
    { key: "games", text: "games", value: "games" },
    { key: "cinema", text: "cinema", value: "cinema" },
    { key: "others", text: "others", value: "others" },
  ];
  
  useEffect(() => {
    console.log("hereeeeeeeeeeee")
    if(props.isEdit===true || props.isView===true){
      console.log("hereeeeeeeeeee11e",props.currentTransaction.transactionName)
      setTransName(props.currentTransaction.transactionName)
      setCategory(props.currentTransaction.category)
      setAmount(props.currentTransaction.amount)
    }
  },[props.currentTransaction]);

  const CheckBoxClicked = (e, data) => {
    setSplit(!withSplit);
  };
  const onChangePeoples = (e, data) => {
    console.log("dataaa", data);
    setPeople(data.value);
  };
  const onChangeCategoty = (e, data) => {
    console.log("value", data);
    setCategory(data.value);
  };
  const addTransactionHandler = () => {
    let persons = [];
    let cost = parseInt(amount);
    if (people.length > 0) {
      // cost=parseInt(amount)/people.length+1
      cost = cost / (people.length + 1);
      //console.log("coseeee",cost/(people.length+1),typeof cost,typeof (people.length+1),600/3)
    }
    console.log("costtt", cost);
    if (withSplit && props.options.length > 0) {
      props.options.map((val) => {
        if (people.includes(val.value)) {
          persons.push({ name: val.key, amount: cost, userId: val.value });
        }
      });
    }
    let currentUSER = { userId: props.id, name: props.name, amount: cost };
    dispatch(
      addTransaction({
        Id: props.id,
        transactionName: transactionName,
        amount: parseInt(amount),
        category,
        personsInvoled: people.length + 1,
        persons,
        currentUSER,
      })
    );
    props.onCancel();
  };
  const updateTransactionHandler = () => {
    dispatch(
      updateTransaction(props.currentTransaction._id, {
        category,
        amount: parseInt(amount),
        transactionName,
      })
    );
    props.onCancel();
  };
  console.log("myCurrentTRansaction", props.currentTransaction,props.isEdit);
  return (
    <Modal
      open={props.openModal}
      className="add-transaction-modal"
      style={{ width: "40%", right: "0px", boxSizing: "border-box" }}
    >
      <Modal.Header className="firewall-menu-header">
        <span style={{ marginRight: "auto" }}>
          {props.isEdit
            ? "Edit Transaction"
            : props.isAdd
            ? "Add Transaction"
            : "View Transaction"}
        </span>
        <div className="type-btn" onClick={() => props.onCancel()}>
          <IoClose />
        </div>
      </Modal.Header>
      <Modal.Content id="add-transactionss-ui-modal">
        <div>
          <div
            className="column-height"
            style={{
              height: "calc(100vh - 130px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Grid
              columns={1}
              style={{
                margin: "0px",
                padding: "0px",
                boxSizing: "border-box",
                padding: "20px 30px",
              }}
            >
              <Grid.Row columns="1" style={{ padding: "0px" }}>
                <Grid.Column
                  style={{
                    width: "100%",
                    padding: "0px",
                    paddingBottom: "20px",
                  }}
                >
                  <p className="user-text">Transaction name</p>
                  <div className="adduser-input">
                    <Input
                      disabled={props.isView}
                      value={transactionName}
                      type="text"
                      placeholder="enter amount"
                      id="add-transaction-input-styles"
                      onChange={(e) => setTransName(e.target.value)}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column
                  style={{
                    width: "100%",
                    padding: "0px",
                    paddingBottom: "20px",
                  }}
                >
                  <p className="user-text">Amount</p>
                  <div className="adduser-input">
                    <Input
                      disabled={props.isView}
                      value={amount}
                      type="number"
                      placeholder="enter amount"
                      id="add-transaction-input-styles"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column
                  style={{
                    width: "100%",
                    padding: "0px",
                    paddingBottom: "20px",
                  }}
                >
                  <p className="user-text">Category</p>
                  <div className="adduser-input">
                    <Dropdown
                      disabled={props.isView}
                      value={category}
                      placeholder="Category"
                      fluid
                      selection
                      options={categoryOptions}
                      onChange={(e, data) => onChangeCategoty(e, data)}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column
                  style={{ padding: 0, width: "100%", paddingBottom: "20px" }}
                  id="uploadDatatModelCheckBoxStyles"
                >
                  <Checkbox
                    disabled={props.isView || props.isEdit}
                    label="CHECK IF YOU NEED TO SPLIT AMOUNT ! "
                    name="enableForAll"
                    checked={withSplit}
                    onChange={(e, data) => CheckBoxClicked(e, data)}
                    style={{
                      float: "left",
                      margin: "0px 0px",
                      top: "10px",
                    }}
                  />
                </Grid.Column>
                {withSplit && (
                  <Grid.Column
                    style={{
                      width: "100%",
                      padding: "0px",
                      paddingBottom: "20px",
                    }}
                  >
                    <p className="user-text">Persons</p>
                    <div className="adduser-input">
                      <Dropdown
                        disabled={props.isView || props.isEdit}
                        placeholder="select people"
                        fluid
                        multiple
                        selection
                        options={props.options}
                        value={people}
                        onChange={(e, data) => onChangePeoples(e, data)}
                      />
                    </div>
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
          </div>
          <div>
            <Grid
              style={{
                backgroundColor: "#f4f4f4",
                width: "100%",
                position: "fixed",

                bottom: "15px",
                right: "14px",
              }}
            >
              <Grid.Row
                style={{
                  height: "60px",
                  justifyContent: "space-between",
                  padding: "14px 30px",
                }}
              >
                <div>
                  <Button
                    className={"rule-btn1"}
                    style={{ minWidth: "100px", margin: 0 }}
                    onClick={() => props.onCancel()}
                  >
                    Cancel
                  </Button>
                </div>
                <div>
                  {props.isEdit === true ? (
                    <Button
                      type="submit"
                      className={"rule-btn2"}
                      style={{ minWidth: "100%", margin: 0 }}
                      disabled={
                        props.isView === true ||
                        category === "" ||
                        transactionName === "" ||
                        amount === ""
                      }
                      onClick={updateTransactionHandler}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className={"rule-btn2"}
                      style={{ minWidth: "100%", margin: 0 }}
                      disabled={
                        props.isView === true ||
                        category === "" ||
                        transactionName === "" ||
                        amount === ""
                      }
                      
                      onClick={addTransactionHandler}
                    >
                      Proceed
                    </Button>
                  )}
                </div>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default Child;
