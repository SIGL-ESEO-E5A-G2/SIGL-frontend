import React, { Component } from 'react';

class DynamicFormPlanningDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      dates: [],
    };
  }

  handleRoleChange = (event) => {
    const role = event.target.value;
    this.setState({
      role,
      dates: [], 
    });
  };  

  handleDateChange = (index, type, event) => {
    const dates = [...this.state.dates];
    dates[index][type] = event.target.value;
    this.setState({
      dates,
    });
  };

  handleAddDate = () => {
    if (this.state.role === 'echeance') {
      this.setState({
        dates: [...this.state.dates, { date: '' }],
      });
    } else {
      this.setState({
        dates: [...this.state.dates, [{ debut: '', fin: '' }],],
      });
    }
  };

  render() {
    const { role, dates } = this.state;

    return (
      <div>
        <h2 className="text-center mt-3">Formulaire d'utilisateur</h2>
        <form className="m-5" method="post" onSubmit={this.handleSubmit}>
        <select
          className="form-select mb-lg-5" id="role" name="role" value={role} onChange={this.handleRoleChange}>
          <option value="" disabled>Select one--</option>
          <option value="echeance">Échéance</option>
          <option value="periode">Période</option>
        </select>

          {role === 'echeance' && (
            <div className="form-group">
              <label htmlFor="dates">Échéance(s) :</label>
              {dates.map((date, index) => (
                <div key={index} className="mb-3">
                  <label htmlFor={`date_${index}`}>Échéance {index + 1} :</label>
                  <input
                    type="date"
                    name={`date_${index}`}
                    id={`date_${index}`}
                    value={date.date}
                    onChange={(event) => this.handleDateChange(index, 'date', event)}
                  />
                </div>
              ))}
            </div>
          )}

          {role === 'periode' && (
            <div className="form-group">
              <label htmlFor="dates">Période(s) :</label>
              {dates.map((date, index) => (
                <div key={index} className="mb-3">
                  <label htmlFor={`date_${index}_debut`}>Période {index + 1} (début) :</label>
                  <input
                    type="date"
                    name={`date_${index}_debut`}
                    id={`date_${index}_debut`}
                    value={date[0].debut}
                    onChange={(event) => this.handleDateChange(index, 'debut', event)}
                  />
                  <label htmlFor={`date_${index}_fin`}>Période {index + 1} (fin) :</label>
                  <input
                    type="date"
                    name={`date_${index}_fin`}
                    id={`date_${index}_fin`}
                    value={date[0].fin}
                    onChange={(event) => this.handleDateChange(index, 'fin', event)}
                  />
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={this.handleAddDate}
          >
            Ajouter une date/période
          </button>

          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={this.handleSubmit}
          >
            Valider la séléction
          </button>
        </form>
      </div>
    );
  }
}

export default DynamicFormPlanningDates;
