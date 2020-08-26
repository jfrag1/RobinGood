import React from 'react';
import { fetchCompanyData } from '../../util/external_api_util';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { CEO: '', city: '', state: '', employees: '', sector: '', description: '' };
  }

  componentDidMount() {
    fetchCompanyData(this.props.ticker)
      .then(({ CEO, city, state, employees, sector, description }) => {
        this.setState({ CEO, city, state, employees, sector, description });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.ticker !== prevProps.ticker) {
      fetchCompanyData(this.props.ticker)
        .then(({ CEO, city, state, employees, sector, description }) => {
          this.setState({ CEO, city, state, employees, sector, description });
        });
    }
  }

  render() {
    const empls = this.state.employees ?
      this.state.employees.toLocaleString('en') : '-';
    return (
      <section className="about">
        <h2>About</h2>
        <p>{this.state.description}</p>
        <div className="details">
          <div>
            <span>CEO</span>
            <span>{this.state.CEO}</span>
          </div>
          <div>
            <span>Employees</span>
            <span>{empls}</span>
          </div>
          <div>
            <span>Headquarters</span>
            <span>{`${this.state.city}, ${this.state.state}`}</span>
          </div>
          <div>
            <span>Sector</span>
            <span>{this.state.sector}</span>
          </div>
        </div>
      </section>
    );
  }
}

export default About;