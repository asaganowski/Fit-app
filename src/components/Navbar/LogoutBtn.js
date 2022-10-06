import React from 'react'
import { Button } from 'react-bootstrap'
import {useAuth0} from '@auth0/auth0-react'
import { FiLogOut } from "react-icons/fi";

function LogoutBtn() {

    const {logout, isAuthenticated } = useAuth0()

  return (
      isAuthenticated && (
        <Button variant="outline-success" onClick={()=>logout()}>
            <FiLogOut />&nbsp;Sign out
        </Button>
      )
    
  )
}

export default LogoutBtn