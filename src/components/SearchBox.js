import React from 'react';

class SearchBox extends React.Component {
    render() {
        return (
            <input type="text" className="form-control col-md-7" onChange={this.props.searchUser}
                   placeholder="Search..." maxLength="50"/>
        );
    }

}

export default SearchBox;