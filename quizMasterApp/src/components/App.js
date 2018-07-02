import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import {
  Grid,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  FormControl
} from "react-bootstrap";

import { subscribeToServer } from "../services/api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      quizName: "",
      timestamp: "no timestamp yet",
      endpoint: "http://127.0.0.1:5000"
    };
  }

  myInput = React.createRef();

  handleLogin = event => {
    //  Stop the form from submitting
    event.preventDefault();
    const quiznightName = this.myInput.value;

    subscribeToServer((err, timestamp) =>
      this.setState({
        gameStarted: true,
        timestamp
      })
    );
  };

  render() {
    const { gameStarted } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        {gameStarted ? (
          <p className="App-intro">
            This is the timer value: {this.state.timestamp}
          </p>
        ) : (
          <Grid>
            <Row className="show-grid">
              <Col md={3} mdOffset={6}>
                <Form onSubmit={this.handleLogin}>
                  <FormGroup controlId="quizname" bsSize="large">
                    <Label> Quiznight's name</Label>
                    <FormControl
                      autoFocus
                      type="text"
                      inputRef={ref => {
                        this.myInput = ref;
                      }}
                      required
                      placeholder="quiznight name"
                    />
                    <br />
                    <Button block bsSize="large" type="submit">
                      Start
                    </Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Grid>
        )}
      </div>
    );
  }
}
export default App;
