import React, {Component} from 'react';
import UsersTable from './UsersTable.js';
import SearchBox from './SearchBox.js';
import CreateUserForm from './CreateUserForm.js';

import UsersJSON from '../users.json';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: UsersJSON
        };

        this.searchUser = this.searchUser.bind(this);
        this.usersUpdated = this.usersUpdated.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
                <SearchBox searchUser={this.searchUser}/>
                <hr/>
                <CreateUserForm addUser={this.usersUpdated}/>
                <hr/>
                <UsersTable usersProp={this.state.users}/>
            </div>
        );
    }

    usersUpdated(user) {
        UsersJSON.push(user);
        this.setState({users: UsersJSON})
    }

    searchUser(e) {
        const searchValue = e.target.value.toUpperCase();

        if (searchValue.length > 0) {
            const filteredUsers = UsersJSON.filter((x) => {
                return x.firstName.toUpperCase().indexOf(searchValue) !== -1 ||
                    x.lastName.toUpperCase().indexOf(searchValue) !== -1 ||
                    x.address.toUpperCase().indexOf(searchValue) !== -1 ||
                    x.mail.toUpperCase().indexOf(searchValue) !== -1 ||
                    x.phone.toUpperCase().indexOf(searchValue) !== -1
            });
            this.setState({users: filteredUsers});
        } else {
            this.setState({users: UsersJSON});
        }
    }
}

export default App;