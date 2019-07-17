import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

function CarCreate(props) {
  const defaultCar = {
    car: {
      ID: '',
      Name: '',
      Company: '',
      Color: '',
      CV: '',
    }
  }
  const [car, setCar] = useState(defaultCar);

  const handleChange = (name) => (e) => {
    console.log("Handle Change Property:" + name + " Value:" + e.target.value)
    setCar({ ...car, [name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("Car:", JSON.stringify(car))
    fetch('http://localhost/csp/conn/rest/cars/', {
      method: 'POST',
      body: JSON.stringify(car)
    })
      .then(res => res.json())
      .then(response => console.log("Create Success:", JSON.stringify(response)))
      .then(() => {
        console.log("Routing");
        props.history.push('/', {});
      });
  }

  return (
    <>
      <div className="Car-Update">
        <h1>Car Create</h1>
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

export default CarCreate;