import React, { useState } from "react";
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
import { addTransaction, allTransactions } from "../../actions/Transaction";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
const OpenView = (props) => {
  console.log("poprs", props.userData);

  return (
    <Modal
      open={props.openViewModal}
      className="add-transaction-modal view-modal-only"
      style={{ width: "60%", right: "0px", boxSizing: "border-box" }}
    >
      <Modal.Header className="firewall-menu-header">
        <span style={{ marginRight: "auto" }}>user details</span>
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
              style={{
                margin: "0px",
                padding: "0px",
                boxSizing: "border-box",
                padding: "20px 30px",
              }}
            >
              <Grid.Row columns="3" style={{ padding: "0px" }}>
                <Grid.Column
                  style={{
                    width: "100%",
                    padding: "0px",
                    paddingBottom: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <p className="user-text"> name</p>
                  <div className="adduser-input">
                    <Input
                      //   disabled={props.isView}
                      //   value={transactionName}
                      value={props.userData.name}
                      type="text"
                      placeholder="enter amount"
                      id="add-transaction-input-styles"
                      //   onChange={(e) => setTransName(e.target.value)}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column
                  style={{
                    width: "100%",
                    padding: "0px",
                    paddingBottom: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <p className="user-text">Amount</p>
                  <div className="adduser-input">
                    <Input
                      //   disabled={props.isView}
                      //   value={transactionName}
                      value={props.userData.totalAmount}
                      type="text"
                      placeholder="enter amount"
                      id="add-transaction-input-styles"
                      //   onChange={(e) => setTransName(e.target.value)}
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
                  <p className="user-text">Remaing Amount</p>
                  <div className="adduser-input">
                    <Input
                      //   disabled={props.isView}
                      //   value={transactionName}
                      value={props.userData.remainingAmount}
                      type="text"
                      placeholder="enter amount"
                      id="add-transaction-input-styles"
                      //   onChange={(e) => setTransName(e.target.value)}
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
              
                {props.userData.personWhoOwesYou.length>0 && <div style={{ marginTop: "10px", padding: "20px",width:"300px" }}>
                <h3>Persons Who owes You</h3>
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {props.userData.personWhoOwesYou.map((val, index) => {
                        return (
                          <Table.Row key={index}>
                            <Table.Cell>{val.name}</Table.Cell>
                            <Table.Cell>{val.amount}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                </div>}
                {props.userData.personWhoOwesYou.length>0 && <div style={{ marginTop: "10px", padding: "20px",width:"300px" }}>
                <h3>Persons you owe</h3>
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {props.userData.personYouOwe.map((val, index) => {
                        return (
                          <Table.Row key={index}>
                            <Table.Cell>{val.name}</Table.Cell>
                            <Table.Cell>{val.amount}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                </div>}
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
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default OpenView;
