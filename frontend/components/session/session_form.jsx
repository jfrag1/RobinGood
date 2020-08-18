import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state)
      .then(() => this.props.history.push('/portfolio'));
  }

  render() {
    const [linkText, linkPath] = this.props.formType === 'Sign Up' ?
      ['Login', '/login'] : ['Sign Up', '/signup'];
    return (
      <div className="session-form">
        <header className="session-header">{this.props.formType}</header>
        <form onSubmit={this.handleSubmit}>
          <label>Username:
            <input type="text" value={this.state.username} onChange={this.handleInput('username')} />
          </label>
          
          <label>Password:
            <input type="password" value={this.state.password} onChange={this.handleInput('password')} />
          </label>
          <button type="submit">{this.props.formType}</button>
        </form>
        <Link to={linkPath}>{linkText}</Link>
      </div>
    );
  }
}

export default SessionForm;