import React from 'react'
import { Button } from 'react-bootstrap'
import {useAuth0} from '@auth0/auth0-react'
import { FiLogIn } from "react-icons/fi";

function LoginBtn() {

    const {loginWithRedirect, isAuthenticated } = useAuth0()

  return (
      !isAuthenticated && (
        <Button variant="outline-success" onClick={()=>loginWithRedirect()}>
            <FiLogIn />&nbsp;Sign in
        </Button>
      )
    
  )
}

export default LoginBtn