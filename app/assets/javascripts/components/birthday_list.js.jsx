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
      url: "/birthdays/index",
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

  render: function(){

    var cardsNode = this.state.people.map(function(person) {
      return <PersonInfo key={person.id} data={person}/>
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
      <div class="row">
        <div class="large-12 columns">
          <div class="row">
            {displayBlock}
          </div>
        </div>
      </div>
    );

  }
});
