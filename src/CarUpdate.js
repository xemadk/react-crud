import React, {useState,useEffect} from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function CarUpdate(props) {
  const defaultCar = {
      ID: '',
      Name: '',
      Company: '',
      Color: '',
      CV: '',
    };
  const [car, setCar] = useState(defaultCar);

  useEffect(() => {
    getCar();
  },[])

  function getCar() {
    console.log("GetCar");
    const id = props.match.params.id
    fetch('http://localhost/csp/conn/rest/cars/' + id)
      .then((result) => {
        return result.json();
      }).then((jsonData) => {
        console.log("GetElement:", jsonData);
        setCar(jsonData);
      });
  }

  const handleChange = (name) => (e) => {
    console.log("Handle Change Property:" + name + " Value:" + e.target.value)
    setCar({ ...car, [name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    fetch('http://localhost/csp/conn/rest/cars/', {
      method: 'PUT',
      body: JSON.stringify(car)
    })
      .then(res => res.json())
      .then(response => console.log("Updated Success:", JSON.stringify(response)))
      .then(() => {
        console.log("Routing");
        props.history.push('/', { refreshTable: true })
      });
  }

  return (
    <>
      <div className="Car-Update">
        <h1>Car Update</h1>
        <form onSubmit={onSubmit}>
          <TextField
            label="Name"
            value={car.Name}
            onChange={handleChange('Name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Company"
            value={car.Company}
            onChange={handleChange('Company')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Color"
            value={car.Color}
            onChange={handleChange('Color')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="CV"
            value={car.CV}
            onChange={handleChange('CV')}
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

export default CarUpdate