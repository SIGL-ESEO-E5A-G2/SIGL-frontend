import React, { Component } from 'react';

class DynamicFormTutoralTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          name: "",
          prenom:"",
          email: "",
        },
      ],
    };
  }

  handleAddUser = () => {
    this.setState({
      users: [...this.state.users, {
        nom: "",
        prenom:"",
        email: "",
      }],
    });
  };

  render() {
    return (
      <div>
        <h2 className="text-center mt-3">Ajouter des membres d'équipe tutorale</h2>
        <form className="m-5" method="post" onSubmit={this.handleSubmit}>
          
        <select className="form-select mb-lg-5" id="apprenti" name="role" value={this.state.role} onChange="">
              <option value="" disabled selected>Select one--</option> // Add placeholder option
              <option value="tuteurPedagogique">Tuteur pédagogique</option>
              <option value="maitreApprentissage">Maître d'apprentissage</option>
            </select>
          {this.state.users.map((user, index) => (
            <div key={index}>
              <div className="form-group">
                <label htmlFor="nom">Nom :</label>
                <input type="text" name="nom" id="nom" value={user.name} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prenom :</label>
                <input type="text" name="prenom" id="prenom" value={user.name} onChange={this.handleChange}/>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email :</label>
                <input type="email" name="email" id="email" value={user.email} onChange={this.handleChange}/>
              </div>
            </div>
          ))}
          <button type="button" className="m-3 btn btn-primary btn-lg btn-block" onClick={this.handleAddUser}>
            Ajouter un utilisateur
          </button>
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick="">
            Valider la séléction
          </button>
        </form>
      </div>
    );
  }
}

export default DynamicFormTutoralTeam;
