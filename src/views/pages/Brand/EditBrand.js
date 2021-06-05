import React from "react";

class EditBrand extends React.Component {
  constructor(props) {
    super(props);
    const { id, name} = props.location.state.brand;
    console.log(props)
    this.state = {
      id,
      name,
    };
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.name === "") {
      alert(" fields is mandatory!");
      return;
    }
    this.props.updateBrandHandler(this.state);
    this.setState({ name: ""});
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h2>Edit Brand</h2>
        <form className="ui form" onSubmit={this.update}>
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
          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
  }
}

export default EditBrand;