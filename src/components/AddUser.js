import React from "react";
import { createRoutesFromElements, Link, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import userService from "../services/user.service";
import Select from "react-select"
import roleService from "../services/role.service";

const AddUser = () => {
  const [username, setUsername] = useState('');//
    const [roles, setRoles] = useState([]);
    const [roless, setRoless] = useState([]);
    const [email, setEmail] = useState('');//
    const [password, setPassword] = useState('');
    const [passwordTemp, setPasswordTemp] = useState('');
    const [roleList, setRoleList] = useState([]);
    // const [adresas, setAddress] = useState('');
    // const [telNumeris, setPhone] = useState('');
    // const [klientoStatusas, setCustomerStatus] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
//const roles = [...roless];

//         setRoles(newRoles)
    
    const saveUser = (e) => {
        e.preventDefault();
        //roles = [roless];
        //setRoles(a => [...a, roless]);
        // console.log(password + "   pass pries")
        // if(password.length < 6) {setPassword({passwordTemp})
        //   // let password=passwordTemp;
        // console.log("suveike" + password.length)};

        //  console.log("pass po  " + password)
        const user = {username, password, email, roles, id};
       console.log(user);
        if (id) {
            // update record
            userService.update(user, id)
                .then(response => {
                    console.log('User data updated successfully', response.data);
                    navigate('/users'); 
            })
            .catch(error => {
                console.log('Something went wrong3333', error);
            })
        } else {
            // create new record
            userService.create(user)
            .then(response => {
                console.log('User added successfully',  response.data);
                navigate('/users');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
    }
    // const functionName = () => {
    //     setRoles(current => [...current, {roless}]);
    // }

    useEffect(() => {
       // console.log(user)
        if (id) {
           
          userService.get(id)
                .then(user => {
                    setUsername(user.data.username);
                    setPasswordTemp(user.data.password);
                    setEmail(user.data.email);
                    //setRoles([{id: '1', name: 'ROLE_USER'},{id: '2', name: 'ROLE_ADMIN'}]);
                    //setRoles(current => [...current, {roless}]);
                    setRoles(user.data.roles)
                console.log('selected role', user.data.role)
                    
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        }
        roleService
        .getAll()
        .then((response) => {
            console.log("Printing Role data", response.data);/////
            setRoleList(response.data);
        })
        .catch((error) => {
            console.log("Ups", error);
        }); 
    },[])

    return(
        <div className="container">
            <h3>Pridėti useri</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control col-4"
                        id="vardas"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Įveskite username"
                     />

                     

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="pavarde"
                      // value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Įveskite nauja slaptazodi"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="įveskite el. paštą"
                    /> 

                </div>
               

<div className="form-group">
                    <Select     
                        value={roles}             
                        options={roleList}
                        getOptionLabel = {a => a.name}
                        getOptionValue={a => a}  
                        className=" col-4"
                        id="roles"
                        onChange={(e) => setRoles(e)} 
                        > 
                    </Select>
                </div>

            
                {/* <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="adresas"
                       value={adresas}
                       onChange={(e) => setAddress(e.target.value)}
                       placeholder="įveskite adresą"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="telNumeris"
                       value={telNumeris}
                       onChange={(e) => setPhone(e.target.value)}
                       placeholder="įveskite telefono numerį"
                    /> 

                </div>
                <div className="form-group">
                    <input
                       type="text"
                       className="form-control col-4"
                       id="klientoStatusas"
                       value={klientoStatusas}
                       onChange={(e) => setCustomerStatus(e.target.value)}
                       placeholder="įveskite kliento statusą"
                    /> 

                </div> */}
                <br />
                <div>
                    <button onClick={(e) => saveUser(e)}
                    className="btn btn-primary">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/users">Atgal į sąrašą</Link>
        </div>
    )
};

export default AddUser;