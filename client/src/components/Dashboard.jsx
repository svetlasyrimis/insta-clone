import React, { Component } from 'react';


export default class Dashboard extends Component {
  state= {
    file: ''
  }

 
  handleChangeFile = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }



  

  render() {
    
    return (
      <div className="post-div">
        <form className="post-form" encType="multipart/form-data"
          onSubmit={(e) => {
          e.preventDefault();
            this.props.handlePhotoSubmit(e);
          }}>
          <p>Your post</p>
          <textarea id="name" value={this.props.name} type="text" name="name" placeholder="What's on your mind?..." onChange={this.props.handlePostChange} />
          
          <input id="file" key={this.props.picture}
            style={{ display: "none" }}
            type="file" name="picture"
            onChange={(e) => {
              this.props.handlePhotoChange(e);
              this.handleChangeFile(e)
            }} />
          
          <label className="select" htmlFor="file">{this.props.picture ? this.props.picture.name : "Upload from library"}</label>
          <img id="post-pic" src={this.state.file} alt="Image preview..."/>
            <input className="post-button" type="submit" id="button" name="" value="Submit"/>
        </form>
        
        {this.props.posts && this.props.posts.map(post => (<div key={post.id}>
          <img id="post-pic" src={post.picture} alt="post-picture" />
          <p>{post.name}</p>
          <button onClick={() => this.props.deletePost(post.id) }>Delete it</button>

        </div>))}
      </div>
    )
  }
}
