import * as React from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export default class CarUpcateComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {car:{
      ID : '',
      Name : '',
      Company : '',
      Color : '',
      CV : '',
     }};
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id
    fetch('http://localhost/csp/conn/rest/cars/'+id)
    .then((result) => {
      return result.json();
    }).then((jsonData)=>{
      console.log("GetElement:",jsonData);
      this.setState({ car : jsonData });
    });
  }

  handleChange = (name) => (e) => {
    this.setState({
      car: {...this.state.car, [name]:e.target.value}
    });
  }

  onSubmit(e){
    e.preventDefault();    
    fetch('http://localhost/csp/conn/rest/cars/',{ 
      method:'PUT',
      body: JSON.stringify(this.state.car)
    })
    .then(res => res.json())
    .then(response => console.log("Updated Success:",JSON.stringify(response)))
    .then(()=>{ 
      console.log("Routing");
      this.props.history.push('/',{refreshTable:true})
    });
  }

  render() {
    const car = this.state.car;
    return (
      <>
        <div className="Car-Update">
          <h1>Car Update</h1>
          <form onSubmit={this.onSubmit}>
            <TextField
              label="Name"
              value={car.Name}
              onChange={this.handleChange('Name')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Company"
              value={car.Company}
              onChange={this.handleChange('Company')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Color"
              value={car.Color}
              onChange={this.handleChange('Color')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="CV"
              value={car.CV}
              onChange={this.handleChange('CV')}
              margin="normal"
              variant="outlined"
            />
            <div className="form-group">
              <Button type="submit" variant="contained" color="primary">Update Car</Button>
            </div>
          </form>
        </div>
      </>
    );
  }
}