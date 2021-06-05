import React from "react";

class AddBrand extends React.Component {
  state = {
    name: ""
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "") {
      alert("fields is mandatory!");
      return;
    }
    this.props.addBrandHandler(this.state);
    this.setState({ name: ""});
  };
  render() {
    return (
      <div className="ui main">
        <h2>Add Brand</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddBrand;