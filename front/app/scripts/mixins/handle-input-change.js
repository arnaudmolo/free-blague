
export default {
  handleInputChange(name) {
    return (event) => this.setState({[name]: event.target.value});
  }
};
