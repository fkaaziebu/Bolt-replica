import React from 'react'
import Form from './Form'
import Header from './Header'

function LoginForm() {
  return (
    <div className="container-fluid d-flex flex-column align-items-center mt-3">
      <div className="container p-0">
        <Header />
        <Form />
      </div>
    </div>
  )
}

export default LoginForm
