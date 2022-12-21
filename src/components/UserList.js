import React, { useEffect, useState } from "react";
import userService from "../services/user.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomersList = () => {
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    userService
      .getAll()
      .then((response) => {
        console.log("Printing User data", response.data);
        setUsers(response.data);
 
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  const handleDelete = (id) => {
    userService
      .remove(id)
      .then((response) => {
        console.log("user deleted");
        init();
      })
      .catch((error) => {
        console.log("Ups", error);
      });
  };

  return (
    <div className="container">
      <h3>Useriu sąrašas</h3>
      <hr />
      <div>
        <Link
          to="/users/add"
          className="btn btn-outline-primary btn-block btn-lg mb-2"
        >
          Pridėti useri
        </Link>
        <table
          border="1"
          cellPadding="10"
          className="table table-border table-striped"
        >
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
               <th>Roles</th>
              {/*<th>Email</th>
              <th>Tipas</th>
              <th>Adresas</th>
              <th>Telefono numeris</th>
              <th>Kliento statusas</th>*/}
              <th>Veiksmai</th> 
            </tr>
          </thead>
          <tbody>
            {users.map((users,role) => (
              <tr key={users.id}>
                <td>{users.username}</td>
                
                
                <td>{users.roles.name}</td>
                {/* <td>{customer.tipas}</td>
                <td>{customer.adresas}</td>
                <td>{customer.telNumeris}</td>
                <td>{customer.klientoStatusas}</td>*/}
                <td> 
                  <Link
                    to={`/users/edit/${users.id}`}
                    className="btn btn-outline-success mt-2 mr-2"
                  >
                    Atnaujinti
                  </Link>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={(e) => {
                      handleDelete(users.id);
                    }}
                  >
                    Ištrinti
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersList;