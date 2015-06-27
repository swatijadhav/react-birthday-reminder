this.BirthdayList = React.createClass({
  displayName: 'BirthdayList',
  getInitialState: function() {
    return {
      didFetchData: false,
      people: []
    };
  },

  componentDidMount: function() {
    return this._fetchPeople({});
  },

  _fetchPeople: function(data) {
    return $.ajax({
      url: "/birthdays",
      dataType: 'json',
      data: data
    }).done(this._fetchDataDone).fail(this._fetchDataFail);
  },

  _fetchDataDone: function(data, textStatus, jqXHR) {
    return this.setState({
      didFetchData: true,
      people: data
    });
  },

  handleSubmit: function() {
    var name = this.refs.name.getDOMNode().value;
    var birthdate = this.refs.birthdate.getDOMNode().value;
    var email = this.refs.email.getDOMNode().value;
    var obj = {name: name, email: email, birthdate: birthdate };
    var newPeople = this.state.people.concat(obj);
    this.setState({people: newPeople});
    this._addPerson({birthday: obj});
  },

  _addPerson: function(data) {
    return $.ajax({
      url: "/birthdays",
      dataType: 'json',
      type: 'post',
      data: data
    }).done(this._fetchDataDone);
  },

  _removePerson: function(id) {
    return $.ajax({
      url: "/birthdays/" + id,
      dataType: 'json',
      type: 'delete',
    });
  },

  handleDeleteClick: function(id){
    records = this.state.people.slice();
    record = $.grep(records, function(e) { return e.id == id })[0];
    index = records.indexOf(record);
    records.splice(index, 1);
    this.replaceState({people: records});
    this._removePerson(id);
  },

  render: function(){
    var _this = this;

    var cardsNode = _this.state.people.map(function(person) {
      var boundDeleteClick = _this.handleDeleteClick.bind(this, person.id);
      return <PersonInfo key={person.id} data={person} onDeleteClick={boundDeleteClick}/>
    });

    var noDataNode = (
      <div className="warning">
        <span className="fa-stack">
          <i className="fa fa-meh-o fa-stack-2x"></i>
        </span>
        <h4>No people found...</h4>
      </div>
    );

    var displayBlock;
    if(this.state.people.length > 0) {
      displayBlock = cardsNode
    }
    else if(this.state.didFetchData){
      displayBlock = noDataNode
    }

    return (

      <div>
        <div>
          <h4>Add new birthday</h4>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Name" id="name" ref="name" />
            <input type="date" placeholder="Birthdate" id="birthdate" ref="birthdate" />
            <input type="email" placeholder="Email" id="email" ref="email" />
            <button type="submit" className="button radius" >Submit</button>
            &nbsp;&nbsp;
            <button type="reset" className="button radius" >Cancel</button>
          </form>
        </div>

        <h4>BirthdayList</h4>
        <div class="row">
          <div class="large-12 columns">
            <div class="row">
              {displayBlock}
            </div>
          </div>
        </div>
      </div>
    );

  }
});
