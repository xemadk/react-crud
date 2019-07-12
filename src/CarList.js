import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';

export default class CarListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    fetch('http://localhost/csp/conn/rest/cars/')
      .then((result) => {
        return result.json();
      }).then((jsonData) => {
        console.log("GetList:", jsonData);
        this.setState({ rows: jsonData });
      });
  }

  deleteElement(id) {
    fetch('http://localhost/csp/conn/rest/cars/' + id, {
      method: 'DELETE'
    })
    .then((jsonData) => { 
      console.log("Deleted",)
      this.getList();
    });
  }

  render() {
    return (
      <>
        <div className="Car">
          <div className="Car-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Company</TableCell>
                  <TableCell align="right">Color</TableCell>
                  <TableCell align="right">CV</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map(row => (
                  <TableRow key={row.ID}>
                    <TableCell align="right">{row.ID}</TableCell>
                    <TableCell align="right">{row.Name}</TableCell>
                    <TableCell align="right">{row.Company}</TableCell>
                    <TableCell align="right">{row.Color}</TableCell>
                    <TableCell align="right">{row.CV}</TableCell>
                    <TableCell align="right">
                      <Button href={'/update/' + row.ID} variant="contained" color="primary">Update</Button>
                      <span> </span>
                      <Button onClick={() => this.deleteElement(row.ID)} variant="contained" color="secondary">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </>
    );
  }
}