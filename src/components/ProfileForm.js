import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ProfileForm extends Component {
  render() {
    return (
      <form className="registration">
        <div className="form-group row">
          <div className="col-md-6">
            <div className="input-group input-group-lg required">
              <span className="input-group-addon"><i className="fa fa-user fa-lg fa-fw"></i></span>
              <input name="firstName" className="form-control" placeholder="first name*" type="text" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group input-group-lg required">
              <span className="input-group-addon"><i className="fa fa-user fa-lg fa-fw"></i></span>
              <input name="lastName" className="form-control" placeholder="last name*" type="text" />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <div className="input-group input-group-lg required">
              <span className="input-group-addon"><i className="fa fa-user fa-lg fa-fw"></i></span>
              <input name="username" className="form-control" placeholder="username*" type="text" />
            </div>
            <p className="help-block">Must be at least 3 characters long.</p>
          </div>
          <div className="col-md-6">
            <div className="input-group input-group-lg required">
              <span className="input-group-addon"><i className="fa fa-envelope fa-lg fa-fw"></i></span>
              <input name="email" className="form-control" placeholder="email@example.com*" type="email" />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="fa fa-user fa-lg fa-fw"></i></span>
              <input name="company" className="form-control" placeholder="company" type="text" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="fa fa-link fa-lg fa-fw"></i></span>
              <input name="companyUrl" className="form-control" placeholder="www.company.com" type="text" />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="fa fa-h-square fa-lg fa-fw"></i></span>
              <input name="registryName" className="form-control" placeholder="registry name" type="text" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="fa fa-archive fa-lg fa-fw"></i></span>
              <input name="registryId" className="form-control" placeholder="registry identifier" type="text" />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="fa fa-hospital-o fa-lg fa-fw"></i></span>
              <input name="npi" className="form-control" placeholder="national provider id" type="text" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="fa fa-folder fa-lg fa-fw"></i></span>
              <input name="tin" className="form-control" placeholder="tax id number" type="text" />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="fa fa-lock fa-lg fa-fw"></i></span>
              <input name="newPassword" autoComplete="off" className="form-control" placeholder="password" type="password" />
            </div>
            <p className="help-block">Leave blank if you don't wish to change.</p>
          </div>
          {/* TODO: hide this field until a user enters something in the password field */}
            <div className="col-md-6">
              <div className="input-group input-group-lg required">
                <span className="input-group-addon"><i className="fa fa-lock fa-lg fa-fw"></i></span>
                <input name="newPasswordConfirmation" autoComplete="off" className="form-control" placeholder="confirm password*" type="password" />
              </div>
            </div>
          {/* */}
        </div>
        {/* TODO: hide this field until a user enters something in the password field */}
          <div className="form-group row" style={{marginTop: "30px"}}>
            <div className="col-md-6">
              <div className="input-group input-group-lg required">
                <span className="input-group-addon"><i className="fa fa-lock fa-lg fa-fw"></i></span>
                <input name="currentPassword" autoComplete="off" className="form-control" placeholder="current password*" type="password" />
              </div>
              <p className="help-block">Please provide your old password.</p>
            </div>
          </div>
        {/* */}

        <fieldset>
          <legend>Preferences</legend>

          <div className="input-group-lg form-group form-horizontal row">
            <div className="col-md-9">
              <label className="control-label"><i className="fa fa-square"></i> Mask the Personal Health Information (PHI)</label>
            </div>

            <div className="col-md-3">

            </div>
          </div>
          <div className="input-group-lg form-group form-horizontal row">
            <div className="col-md-9">
              <label className="control-label"><i className="fa fa-square"></i> Display Percentage Visuals on Measure Performance</label>
            </div>

            <div className="col-md-3">

            </div>
          </div>
          <div className="input-group-lg form-group form-horizontal row">
            <div className="col-md-9">
              <label className="control-label"><i className="fa fa-square"></i> Display Provider Tree on Dashboard</label>
            </div>
            <div className="col-md-3">

            </div>
          </div>
        </fieldset>

        <hr />

        <div className="form-group row">
          <div className="col-md-6 col-md-offset-6">
            <div className="row">
              <div className="col-xs-6"><Link to="/" className="btn btn-default btn-block btn-lg">Cancel</Link></div>
              <div className="col-xs-6"><input className="btn btn-primary btn-block btn-lg" type="submit" disabled /></div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
