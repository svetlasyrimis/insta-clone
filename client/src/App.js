import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
// import { withRouter } from 'react-router';


import Login from './components/Login'
import Register from './components/Register'

import {
  loginUser,
  registerUser,
  verifyUser,
  postPicture,
  getPosts,
  destroyPost
} from './services/api-helper'

import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      authFormData: {
        username: "",
        email: "",
        password: ""
      },
      postData: {
        name: ""
      },
      picture: null,
      posts:[]
    };
  }

  async componentDidMount() {
    // this.getposts();
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
      // const posts = await getPosts(this.state.currentUser.id)
      // this.setState({
      //     posts
      // })
    } else {
      this.props.history.push('/')
    }
  }

  

  // newpost = async (e) => {
  //   e.preventDefault();
  //   const post = await createpost(this.state.postForm);
  //   this.setState(prevState => ({
  //     posts: [...prevState.posts, post],
  //     postForm: {
  //       name: "",
  //       photo: ""
  //     }
  //   }))
  // }

  // editpost = async () => {
  //   const { postForm } = this.state
  //   await updatepost(postForm.id, postForm);
  //   this.setState(prevState => (
  //     {
  //       posts: prevState.posts.map(post => {
  //         return post.id === postForm.id ? postForm : post
  //       }),
  //     }
  //   ))
  // }

  deletePost = async (id) => {
    await destroyPost(this.state.currentUser.id,id);
    this.setState(prevState => ({
      posts: prevState.posts.filter(post => post.id !== id)
    }))
  }

  handlePostChange = ev => {
    const { name, value } = ev.target;
 
    this.setState(prevState => ({
      postData: {
        ...prevState.postData,
        [name]: value
      }
    }));
  }
  
  handlePhotoSubmit = async () => {
    const picture = await this.fileUpload(this.state.picture)
    this.setState(prevState => ({
      posts: [...prevState.posts, picture],
      picture: null
    }))
  }


  fileUpload = picture => {
   
    let id = parseInt(this.state.currentUser.id)
    const formData = new FormData();
    formData.append('name', this.state.postData.name)
    formData.append('picture', picture)
    // formData.append('user_id', id)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  postPicture(formData,config)
  }
  handlePhotoChange = (e) => {
    let picture = e.target.files[0]
    this.setState({
      picture
    })
  }
  

  // mountEditForm = async (id) => {
  //   const posts = await readAllposts();
  //   const post = posts.find(el => el.id === parseInt(id));
  //   this.setState({
  //     postForm: post
  //   });
  // }

  resetForm = () => {
    this.setState({
      postForm: {
        name: "",
        photo: ""
      }
    })
  }

  // -------------- AUTH ------------------

  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    const currentUser = await loginUser(this.state.authFormData);
    this.setState({ currentUser });
    // const posts = await getPosts(this.state.currentUser.id)
    // this.setState({
    //     posts
    // })
    this.props.history.push('/dashboard')
    
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser });
  }

  handleLogout = () => {
    localStorage.removeItem("authToken");
    this.setState({
      currentUser: null
    })
    this.props.history.push("/")
  }

  authHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  render() {
    return (
      <div className="App" >
        {this.state.currentUser &&
          <>
          <Header
            handleLoginButton={this.handleLoginButton}
            handleLogout={this.handleLogout}
            currentUser={this.state.currentUser}
          />
          <Route 
             exact path="/dashboard" render={() => (
              <Dashboard
                currentUser={this.state.currentUser}
                picture={this.state.picture}
                name={this.state.postData.name}
                handlePostChange={this.handlePostChange}
                handlePhotoChange={this.handlePhotoChange}
                handlePhotoSubmit={this.handlePhotoSubmit}
                // posts={this.state.posts}
                deletePost={this.deletePost}
              />)}
           
          />
          </> }
        {!this.state.currentUser &&
          <>
          <Route exact path="/" render={() => (
            <Login
              handleLogin={this.handleLogin}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData} />)} />
          <Route exact path="/register" render={() => (
            <Register
              handleRegister={this.handleRegister}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData} />)} />
            </>  
              }
        {/* <Route
          exact path="/"
          render={() => (
            <postsView
              posts={this.state.posts}
              postForm={this.state.postForm}
              handleFormChange={this.handleFormChange}
              newpost={this.newpost} />
          )}
        />
        <Route
          path="/new/post"
          render={() => (
            <Createpost
              handleFormChange={this.handleFormChange}
              postForm={this.state.postForm}
              newpost={this.newpost} />
          )} />
        <Route
          path="/posts/:id"
          render={(props) => {
            const { id } = props.match.params;
            const post = this.state.posts.find(el => el.id === parseInt(id));
            return <postPage
              id={id}
              post={post}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editpost={this.editpost}
              postForm={this.state.postForm}
              deletepost={this.deletepost} />
          }}
        /> */}
      </div>
    );
  }
}

export default withRouter(App);
