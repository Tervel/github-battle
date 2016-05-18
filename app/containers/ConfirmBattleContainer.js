var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState : function () {
    return {
      isLoading: true,
      playerInfo: []
    }
  },
  componentDidMount: function () {
    var query = this.props.location.query;
    // Fetch info from github then update state
    githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
      .then(function (players) {
        this.setState({
          isLoading: false,
          playersInfo: [players[0], players[1]]
        });
      }.bind(this)); // Sets the context of 'this' keyword to componentDidMount
  },
  render: function () {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo}
      />
    );
  }

});

module.exports = ConfirmBattleContainer;
