import React, { Component } from 'react';

import ProfileForm from '../components/ProfileForm';

export default class EditProfile extends Component {
  render() {
    return (
      <div className="container">
        <div className="register-body">
          <h1>Account Information</h1>

          <ProfileForm />
        </div>
      </div>
    );
  }
}
