import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import LazyLoad from 'react-lazyload';
import Placeholder from './placeholder'

function imageSize(windowSize){
 if(windowSize <750 ){
   console.log("phone");
   console.log(windowSize);
   return "medium_large";
 }
 else if(windowSize >750 &&  windowSize <1024 ){
   console.log("tablet");
   console.log(windowSize);
   return "medium_large";
 }
 else{
   console.log("desktop time")
   return "large";
   }
 };
     var screenSize = imageSize($(window).width());
var Post = React.createClass({
  render: function() {

    return (

      <div className="post">

      <LazyLoad height={2000}>



      <img className="postImg" src={this.props.img_src} alt={this.props.title} />

</LazyLoad>
      <h1 className="commentAuthor">
        {this.props.title}
      </h1>
      <span>
      {this.props.date}
      </span>
<p>
    {this.props.content.substring(this.props.content.lastIndexOf("<p>")+3,this.props.content.lastIndexOf("</p>"))}
</p>

      </div>
    );
  }
});
var App = React.createClass({


  loadPostsFromServer: function() {
      $.ajax({
        url: "http://www.usernameisnull.com/data/wp-json/wp/v2/posts/?_embed",
        dataType: 'json',
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      this.loadPostsFromServer();

    },
    render: function() {
      return (
        <div className="postsContainer">

          <Posts data={this.state.data} />

        </div>
      );
    }
  });

  var Posts = React.createClass({

    render: function() {
      var postNodes = this.props.data.map(function(data, index) {
        return (
          // `key` is a React-specific concept and is not mandatory for the
          // purpose of this tutorial. if you're curious, see more here:
          // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
          <Post title={data.title.rendered} content={data.content.rendered} img_src={data._embedded['wp:featuredmedia'][0].media_details.sizes[screenSize].source_url} date={data.date}key={index}>

          </Post>
        );
      });
      return (
        <div className="postList">
          {postNodes}
        </div>
      );
    }
  });


export default App;
