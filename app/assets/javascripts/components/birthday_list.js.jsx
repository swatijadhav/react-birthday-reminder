this.BirthdayList = React.createClass({
  displayName: 'BirthdayList',

  getInitialState: function() {
    return {
      didFetchData: false,
      people: [],
      name: '',
      birthdate: '',
      email: '',
      id: ''
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
    var id = this.refs.id.getDOMNode().value;
    var obj = {name: name, email: email, birthdate: birthdate, id: id };
    var newPeople;

    if(id){
      record = this._findPerson(id);
      this.state.people[this.state.people.indexOf(record)] = obj;
      newPeople = this.state.people;
    } else {
      newPeople = this.state.people.concat(obj);
    }

    this.setState({people: newPeople});
    this.resetFields();
    this._addPerson({birthday: obj});
  },

  _addPerson: function(data) {
    return $.ajax({
      url: "/birthdays",
      dataType: 'json',
      type: 'post',
      data: data
    })
  },

  _removePerson: function(id) {
    return $.ajax({
      url: "/birthdays/" + id,
      dataType: 'json',
      type: 'delete',
    });
  },

  _findPerson: function(id){
    records = this.state.people.slice();
    return $.grep(records, function(e) { return e.id == id })[0];
  },

  fillEditForm: function(id){
    record = this._findPerson(id);
    this.setState({name: record.name});
    this.setState({email: record.email});
    this.setState({birthdate: record.birthdate});
    this.setState({id: record.id});
  },

  handleDeleteClick: function(id){
    record = this._findPerson(id);
    index = records.indexOf(record);
    records.splice(index, 1);
    this.replaceState({people: records});
    this._removePerson(id);
  },

  handleNameChange: function(e) {
    this.setState({ name: e.target.value });
  },

  handleDateChange: function(e){
    this.setState({ birthdate: e.target.value });
  },

  handleEmailChange: function(e){
    this.setState({ email: e.target.value });
  },

  resetFields: function(){
    this.setState({ name: "" });
    this.setState({ birthdate: "" });
    this.setState({ email: "" });
  },

  render: function(){
    var _this = this;

    var cardsNode = _this.state.people.map(function(person) {
      var boundDeleteClick = _this.handleDeleteClick.bind(null, person.id);
      var boundEditClick = _this.fillEditForm.bind(null, person.id);
      return <PersonInfo key={person.id} data={person} onDeleteClick={boundDeleteClick} onEditClick={boundEditClick}/>
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
          <h4>Add birthday</h4>
          <input type="text" placeholder="Name" id="name" ref="name" value={this.state.name} onChange={this.handleNameChange} />
          <input type="date" placeholder="Birthdate" id="birthdate" ref="birthdate" value={this.state.birthdate} onChange={this.handleDateChange} />
          <input type="email" placeholder="Email" id="email" ref="email" value={this.state.email} onChange={this.handleEmailChange} />

          <input type="hidden" id="id" ref="id" value={this.state.id}/>

          <button onClick={this.handleSubmit}>Submit</button>
          &nbsp;&nbsp;
          <button onClick={this.resetFields} className="button radius" >Cancel</button>
        </div>

        <h4>BirthdayList</h4>
        <div className="row">
          <div className="large-12 columns">
            <div className="row">
              {displayBlock}
            </div>
          </div>
        </div>
      </div>
    );

  }
});
