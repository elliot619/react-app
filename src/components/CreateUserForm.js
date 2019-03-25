import React from 'react';
import ReactDOM from 'react-dom';

class CreateUserForm extends React.Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            captionReg: "+ Register a new user",
            captionClose: "- Close form",
            caption: "+ Register a new user",
            errors: "",
            errorCount: -1
        };

        this.toggleRegForm = this.toggleRegForm.bind(this);
        this.inputHandling = this.inputHandling.bind(this);
        this.submit = this.submit.bind(this);
    }

    toggleRegForm() {
        const regForm = document.getElementById("regForm");

        this.setState({showForm: !this.state.showForm});
        this.setState({caption: this.state.showForm ? this.state.captionClose : this.state.captionReg});

        ReactDOM.findDOMNode(regForm).style.display = this.state.showForm ? "block" : "none";
    }

    inputHandling(e) {
        const val = e.target.value;
        let result = true,
            regExp,
            err = "";

        if (val.length === 0) {
            result = false;
            err = "* Make sure to complete all the fields.";
        } else if (val.length > 30) {
            result = false;
            err = "* One or more fields has more than 30 characters.";
        } else {

            switch (e.target.name) {
                case "txtAddress":
                    regExp = /^[a-zA-Z0-9\s,'-]*$/;
                    break;
                case "txtMail":
                    regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    break;
                case "txtMobile":
                    regExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                    break;
                case "txtFirstName":
                case "txtLastName":
                default:
                    regExp = /^[a-zA-Z]*$/;
                    break;

            }

            result = regExp.test(val);
        }

        if (!result) {
            e.target.classList.add("has-error");
            if (err.length === 0) {
                err = "* Make sure to enter valid data for all the inputs";
            }
        } else {
            e.target.classList.remove('has-error');
        }

        this.setState({errors: err});
        this.setState({errorCount: document.getElementsByClassName("has-error").length});
    }

    submit(e) {
        if (this.state.errorCount === 0) {
            let firstName = document.getElementsByName("txtFirstName")[0],
                lastName = document.getElementsByName("txtLastName")[0],
                address = document.getElementsByName("txtAddress")[0],
                mail = document.getElementsByName("txtMail")[0],
                mobile = document.getElementsByName("txtMobile")[0];

            const user = {
                "firstName": firstName.value,
                "lastName": lastName.value,
                "address": address.value,
                "mail": mail.value,
                "phone": mobile.value
            };

            //TODO:Call to set user trough an http request

            firstName.value = "";
            lastName.value = "";
            address.value = "";
            mobile.value = "";
            mail.value = "";

            this.props.addUser(user);
            this.toggleRegForm();
        }
    }

    render() {
        return (
            <section>
                <button type="button" className="btn btn-link"
                        onClick={this.toggleRegForm}>{this.state.caption}</button>
                <form className="form-group" id="regForm">
                    <div className="row">
                        <label htmlFor="txtFirstName" className="col-md-2">First
                            name</label>
                        <input type="text" name="txtFirstName" className="form-control col-md-4" maxLength="30"
                               onChange={this.inputHandling}/>
                    </div>
                    <div className="row">
                        <label htmlFor="txtLastName" className="col-md-2">Last
                            name</label>
                        <input type="text" name="txtLastName" className="form-control col-md-4" maxLength="30"
                               onChange={this.inputHandling}/>
                    </div>
                    <div className="row">
                        <label htmlFor="txtAddress" className="col-md-2">Address</label>
                        <input type="text" name="txtAddress" className="form-control col-md-4" maxLength="30"
                               onChange={this.inputHandling}/>
                    </div>
                    <div className="row">
                        <label htmlFor="txtMobile" className="col-md-2">Mobile</label>
                        <input type="tel" name="txtMobile" className="form-control col-md-4" maxLength="30"
                               onChange={this.inputHandling}/>
                    </div>
                    <div className="row">
                        <label htmlFor="txtMail" className="col-md-2">Mail</label>
                        <input type="email" name="txtMail" className="form-control col-md-4" maxLength="30"
                               onChange={this.inputHandling}/>
                    </div>
                    <div className="row">
                        <button type="button" className="col-md-2 btn btn-success center-block"
                                disabled={this.state.errorCount !== 0}
                                onClick={this.submit}>Save
                        </button>
                    </div>
                    <label className="error-lbl">{this.state.errors}</label>
                </form>
            </section>
        );
    }
}

export default CreateUserForm;