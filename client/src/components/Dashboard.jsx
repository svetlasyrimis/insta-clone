import React, { Component } from 'react'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <form 
          onSubmit={(e) => {
          e.preventDefault();
            this.props.handlePhotoSubmit(e);
        }}>
          <input id="name" value={this.props.name} type="text" name="name" placeholder="What's on your mind?..." onChange={this.props.handlePostChange}/>
          <input id="file" key={this.props.picture} type="file" name="picture" onChange={this.props.handlePhotoChange}/>
            <input type="submit" id="button" name="" value="Submit"/>
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
