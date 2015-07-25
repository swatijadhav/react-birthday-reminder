this.PersonInfo = React.createClass({
  displayName: 'PersonInfo',

  render: function() {
    var gravatar = 'http://www.gravatar.com/avatar/' + md5(this.props.data.email) + '?s=300x300';
    var date = moment(this.props.data.birthdate).format("DD MMMM");

    return (
      <div className="large-2 medium-3 small-6 columns">
        <img src={gravatar}/>

        <div className="panel">
          <h5>{this.props.data.name}</h5>
          <h6 className="subheader">{date}</h6>
          <i className="fa fa-trash" onClick={this.props.onDeleteClick}></i>
          <i className="fa fa-pencil" onClick={this.props.onEditClick}></i>
        </div>
      </div>
    );

  }

});
