import React from 'react';

class SearchBox extends React.Component {
    render() {
        return (
            <input type="text" className="form-control" onChange={this.props.searchUser}
                   placeholder="Search users..." maxLength="50"/>
        );
    }

}

export default SearchBox;