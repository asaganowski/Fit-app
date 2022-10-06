import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

function Profile() {

    const {user} = useAuth0()
    console.log(user)
  return (
    <div>
        <h4>Hello {user?.given_name}!</h4>
    </div>
  )
}

export default Profile