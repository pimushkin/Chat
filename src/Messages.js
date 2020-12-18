import {Component} from "react";
import React from "react";

class Messages extends Component {
  render() {
    return (
      <ul className="Messages-list">
        {this.props.messages.map((message, index) => <RenderMessage message={message} index={index} handleClick={this.props.handleClick} />)}
      </ul>
    );
  }
}

class RenderMessage extends Component {
    render() {
      const {member, text, newMember} = this.props.message;
      const index = this.props.index;
      const handleClick = this.props.handleClick;
      return (
        <>
        {member && 
        <li>
        <span
          className="avatar"
          style={{backgroundColor: member.clientData.color}}
        />
          <div className="Message-content">
            <div className="username">
              {member.clientData.username}
            </div>
            <div className="text">{text}</div>
            <button type="button" onClick={() => handleClick(index)}>Удалить</button>
          </div>
        </li>
        }
        {newMember &&
        <li>
          <span
            className="avatar"
            style={{backgroundColor: newMember.clientData.color}}
          />
          <div className="Message-content">
            <div className="username">
              {newMember.clientData.username}
            </div>
            <div className="text">{text}</div>
          </div>
        </li>
        }
      </>
      );
    }
}

export default Messages;
