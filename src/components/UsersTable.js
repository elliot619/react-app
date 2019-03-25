import React from 'react';

class UsersTable extends React.Component {
    constructor(props) {
        super(props);
        this.sortColumn = this.sortColumn.bind(this);
    }

    render() {
        return (
            <section className="table-container">
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th onClick={this.sortColumn} className="firstName">FirstName</th>
                        <th onClick={this.sortColumn} className="lastName">LastName</th>
                        <th onClick={this.sortColumn} className="phone">Phone</th>
                        <th onClick={this.sortColumn} className="mail">Email</th>
                        <th onClick={this.sortColumn} className="address">Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.usersProp.map((user, i) => <UserRow key={i} data={user}/>)}
                    </tbody>
                </table>
            </section>
        );
    }

    sortColumn(e) {

        let sortedUsers;

        switch (e.target.className) {
            default:
            case "firstName":
                sortedUsers = this.props.usersProp.sort((a, b) => a.firstName > b.firstName ? 1 : -1);
                break;
            case "lastName":
                sortedUsers = this.props.usersProp.sort((a, b) => a.lastName > b.lastName ? 1 : -1);
                break;
            case "phone":
                sortedUsers = this.props.usersProp.sort((a, b) => a.phone > b.phone ? 1 : -1);
                break;
            case "mail":
                sortedUsers = this.props.usersProp.sort((a, b) => a.mail > b.mail ? 1 : -1);
                break;
            case "address":
                sortedUsers = this.props.usersProp.sort((a, b) => a.address > b.address ? 1 : -1);
                break;
        }

        this.setState({users: sortedUsers});
    }
}

class UserRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.data.firstName}</td>
                <td>{this.props.data.lastName}</td>
                <td>{this.props.data.phone}</td>
                <td>{this.props.data.mail}</td>
                <td>{this.props.data.address}</td>
            </tr>
        );
    }
}


export default UsersTable;