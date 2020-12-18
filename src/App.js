import React, { Component } from 'react';
import './App.css';
import Message from "./Messages";
import Input from "./Input";

const randomText = ["красивый, воробей, летать", "оранжевый, ручка, видеть", "интересный, игрушка, роза", "единорог, алфавит, добрый"];

class App extends Component {
  state = {
    messages: [],
    member: {
      username: "Я",
      color: "#aff8e1",
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("XG4srZveQyPHWebE", {
      data: this.state.member
    });
    this.handleClick = this.handleClick.bind(this);
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      const newMember = {
        clientData: {
          color: "#aff8e1",
          username: "Bot"
        },
        id: "w0Ok7gP7i3"
      };
      messages.push({member, text: data});
      console.log(this.state.textBot);
      messages.push({newMember, text: randomText[Math.floor(Math.random() * randomText.length)]});
      this.setState({messages});
    });
  }
  handleClick(index) {
    console.log(index);
     const messages = [...this.state.messages];
     messages.splice(index, 1);
     this.setState({messages});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Чат</h1>
        </div>
        <Message
          messages={this.state.messages}
          currentMember={this.state.member}
          handleClick={this.handleClick}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;
