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

  componentDidMount() {
    this.props.clearErrors();
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
    const [linkText, linkPath, linkTag] = this.props.formType === 'Sign Up' ?
      ['Log In', '/login', 'Already have an account?'] :
      ['Sign Up', '/signup', "Don't have an account?"];
    return (
      <div className="session-page-container">
        <div className="session-img col-1-2" />
        <div className="session-form-container col-1-2">
          <button className="demo-user-button" onClick={this.props.guestLogin}>Log In as Demo User</button>
          <header className="session-header">Welcome to RobinGood</header>
          <ul className="session-errors">
            {
              this.props.errors.map((error, idx) => (<li key={idx}>{error}</li>))
            }
          </ul>
          <form className="session-form" onSubmit={this.handleSubmit}>
            <label><span>Username</span>
              <input type="text" value={this.state.username} onChange={this.handleInput('username')} />
            </label>
            
            <label><span>Password</span>
              <input type="password" value={this.state.password} onChange={this.handleInput('password')} />
            </label>
            <button type="submit">{this.props.formType}</button>
          </form>
          <section className="session-link">
            <span>{linkTag}</span>
            <Link to={linkPath}>{linkText}</Link>
          </section>
        </div>
      </div>
    );
  }
}

export default SessionForm;