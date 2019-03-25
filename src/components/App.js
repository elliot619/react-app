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
                <SearchBox searchUser={this.searchUser}/>

                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="/">Users managing</a>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <form className="form-inline mt-2 mt-md-0">
                            <SearchBox searchUser={this.searchUser}/>
                        </form>
                    </div>
                </nav>


                <hr/>
                <CreateUserForm addUser={this.usersUpdated}/>
                <hr/>
                <UsersTable usersProp={this.state.users}/>
            </div>
        );
    }

    usersUpdated(user) {
        UsersJSON.unshift(user);
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