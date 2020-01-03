import React from 'react'
import { Link } from 'react-router-dom'
import instagram from "../assets/instagram.png"

export default function Header(props) {
  return (
    <header>
      <Link to='/' className="nav-brand-logo" onClick={props.resetForm}><img src={instagram} alt=""/></Link>
      <div className="user-profile-box">
        {props.currentUser
          ?
          <div className="user-profile">
            <p>{props.currentUser.username}</p>
            <button onClick={props.handleLogout}>Logout</button>
          </div>
          :
          <></>
        }
      </div>
    </header>
  )
}