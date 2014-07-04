var React = require('react');
var data = require('./data.json');

var Page = React.createClass({
  render: function() {
    var cards = data.projects.map(function(card, i) {
      return (
        <Card
          name={card.name}
          attr={card.attr}
          links={card.links}
          images={card.images}
          num={i}
          key={i} />
      );
    });
    return (
      <div className='content'>
        {cards}
      </div>
    );
  }
});

var Card = React.createClass({
  render: function() {
  return (
    <div className='block'>
      <Title name={this.props.name} />
      <Attributes arr={this.props.attr} />
      <CardBg src={this.props.images[0]} num={this.props.num} />
    </div>
  );
  }
});

var Title = React.createClass({
  render: function() {
  return (
    <h1>{this.props.name}</h1>
  );
  }
});

var Attributes = React.createClass({
  render: function() {
  var boxes = this.props.arr.map(function(text) {
    return <li>{text}</li>;
  });
  return (
    <ul>{boxes}</ul>
  );
  }
});

var CardBg = React.createClass({
  render: function() {
    var style = {
      'background-image': 'url(' + this.props.src + ')'
    };
    return (
      <div className={'background order-' + this.props.num}
           style={style} >
      </div>
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
      <a href={this.props.href} target="_blank">
        <svg className="icon" viewBox="0 0 32 32"
          dangerouslySetInnerHTML={{__html: iconhtml}} />
      </a>
    );
  }
})

React.renderComponent(
  <Page />,
  document.querySelector(".content")
);
