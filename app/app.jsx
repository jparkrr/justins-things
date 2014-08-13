'use strict';
var React = require('react');
var data = require('./data.json');

var Page = React.createClass({
  render: function() {
    var cards = data.projects.map(function(card, i) {
      return (
      /* jshint ignore: start */
        <Card
          name={card.name}
          attr={card.attr}
          links={card.links}
          images={card.images}
          num={i}
          key={i} />
      /* jshint ignore: end */
      );
    });

    return (
      /* jshint ignore: start */
      <div className='content'>
      {cards}
      </div>
      /* jshint ignore: end */
    );
  }
});

var Card = React.createClass({
  getInitialState: function() {
    return {hovered: false};
  },
  setHovered: function(child) {
    this.setState({hovered: true});
  },
  unsetHovered: function(child) {
    this.setState({hovered: false});
  },
  render: function() {
  return (
    /* jshint ignore: start */
    <div className='block'>
      <Title name={this.props.name}
        myHover={this.setHovered}
        myNoHover={this.unsetHovered}
        hovered={this.state.hovered} />

      <Attributes arr={this.props.attr}
        myHover={this.setHovered}
        myNoHover={this.unsetHovered}
        hovered={this.state.hovered} />

      <Attributes arr={this.props.links.map(function(e) {
        return <Link href={e.url} text={e.name} />
      })} className='links' />

      <CardBg
        src={this.props.images[0]}
        num={this.props.num}
        hovered={this.state.hovered} />
    </div>
    /* jshint ignore: end */
  );
  }
});

var SetHoverMixin = {
  hover: function(event) { if (this.props.myHover) this.props.myHover(this); },
  noHover: function(event) { if (this.props.myHover) this.props.myNoHover(this); },
};

var Title = React.createClass({
  mixins: [SetHoverMixin],
  render: function() {
    var style = {
      'opacity': this.props.hovered ? 0.2 : 0.7
    };
    return (
      /* jshint ignore: start */
      <h1 style={style}
      onMouseEnter={this.hover}
      onMouseLeave={this.noHover}>
        {this.props.name}
      </h1>
      /* jshint ignore: end */
    );
  }
});

var Attributes = React.createClass({
  mixins: [SetHoverMixin],
  render: function() {
    var style = {
      'opacity': this.props.hovered ? 0.2 : 0.7
    };
    function generateKey(e) {
      return (e.props && e.props['text']) || e;
    }
    var that = this;
    var boxes = this.props.arr.map(function(text) {
      return (
        /* jshint ignore: start */
        <li key={generateKey(text)}
        onMouseEnter={that.hover}
        onMouseLeave={that.noHover}>
          {text}
        </li>
        /* jshint ignore: end */
      );
    });
    return (
      /* jshint ignore: start */
      <ul className={this.props.className}
      style={style}>
        {boxes}
      </ul>
      /* jshint ignore: end */
    );
  }
});

var CardBg = React.createClass({
  render: function() {
    var style = {
      'background-image': 'url(' + this.props.src + ')',
      'opacity': this.props.hovered ? 1 : 0.7
    };
    return (
      /* jshint ignore: start */
      <div className={'background order-' + this.props.num}
           style={style} >
      </div>
      /* jshint ignore: end */
    );
  }
});

var Link = React.createClass({
  render: function() {
    var service = this.props.text;
    var icons = ['github', 'linkedin', 'mail', 'link', 'file'];
    if (icons.indexOf(service) == -1)
      service = 'link';
    var iconhtml="<use xlink:href='#icon-" + service + "'></use>";
    return (
      /* jshint ignore: start */
      <a href={this.props.href} target="_blank">
        <svg className="icon" viewBox="0 0 32 32"
          dangerouslySetInnerHTML={{__html: iconhtml}} />
      </a>
      /* jshint ignore: end */
    );
  }
})

React.renderComponent(
/* jshint ignore: start */
  <Page />,
/* jshint ignore: end */
  document.querySelector(".content")
);
