// React
var emotionMap = [
    { emotion: "excited", color: "135, 211, 124" },
    { emotion: "happy", color: "253, 238, 0" },
    { emotion: "angry", color: "242, 38, 19" },
    { emotion: "stressed", color: "242, 121, 53" },
    { emotion: "bored", color: "102, 51, 153" },
];

var API_URL = 'http://lyteup.co';

var Dashboard = React.createClass({
    render: function() {
        return <div>
            <Feed />
            <Sidebar />
        </div>
    }
});

var Sidebar = React.createClass({
    render: function() {
        return <div id="sidebar">
            <Navigation />
        </div>
    }
});

var Profile = React.createClass({
    componentDidMount: function() {
        // ajax /me
    },
    render: function() {
        return <div id="profile">
            <img src="http://www.plentyperfect.com/wp-content/uploads/2012/06/gravatar-300x300_thumb.jpg"/>
        </div>
    }
});

var Navigation = React.createClass({
    getInitialState: function() {
        return { expanded: '', }
    },
    onClick: function(value) {
        this.setState({ expanded: value });
    },
    render: function() {
        if (this.state.expanded !== '') {
            var module;
            switch(this.state.expanded) {
                case "c":
                    module = <Post />
                    break;
                case "f":
                    module = <FriendList />
                    break
            };
            return <div id="navigation">
                <h1 className="title">lyte</h1>
                <span onClick={this.onClick.bind(this, "")} className="close">x</span>
                {module}
            </div>

        }
        return <div id="navigation">
            <h1 className="title">lyte</h1>
            <ul>
                <li onClick={this.onClick.bind(this, "n")}  id="notifications">notifications</li>
                <li onClick={this.onClick.bind(this, "f")}  id="friends">friends</li>
                <li onClick={this.onClick.bind(this, "s")}  id="settings">settings</li>
                <li onClick={this.onClick.bind(this, "c")} id="create-post">new status</li>
            </ul>
            <a id="logout" href="/logout"><p>Logout</p></a>
    </div>
    }
});

var FriendList = React.createClass({
    getInitialState: function() {
        return { none: [], pending: [] };
    },
    refreshFriends: function() {
        $.get(API_URL + '/friends/disconnected', function(data) {
            this.setState({ none: data });
        }.bind(this));

        $.get(API_URL + '/friends/pending', function(data) {
            this.setState({ pending: data });
        }.bind(this));
    },
    componentDidMount: function() {
        this.refreshFriends();
    },
    accept: function(userId) {
        console.log("accept: " + userId);
        $.ajax({
            url: API_URL + '/friend/' + userId + '/accept',
            method: 'PUT'
        }).done(function(data) {
            console.log(data);
            this.refreshFriends();
        }.bind(this));
    },
    add: function(userId) {
        console.log("add: " + userId);
        $.ajax({
            url: API_URL + '/friend/' + userId + '/request',
            method: 'PUT'
        }).done(function(data) {
            console.log(data);
            this.refreshFriends();
        }.bind(this));
    },
    render: function() {
        var noneNodes = this.state.none.map(function(friend) {
            return <div className="friend">
                <img src={friend.profile_url} />
                <p>{friend.name}</p>
                <div onClick={this.add.bind(this, friend.id)} className="btn btn-primary">Send Request</div>
            </div>
        }.bind(this));
        var pendingNodes = this.state.pending.map(function(friend) {
            return <div className="friend">
                <img src={friend.profile_url} />
                <p>{friend.name}</p>
                <div onClick={this.accept.bind(this, friend.id)} className="btn btn-primary">Accept Request</div>
            </div>
        }.bind(this));
        var pendingTitle  = pendingNodes.length > 0 ? <h2>Pending Requests</h2> : "";
        var noneTitle = noneNodes.length > 0 ? <h2>Suggested Friends</h2> : "";
        var emptyTitle = pendingTitle == "" && noneTitle == "" ? <h2>nothing new here</h2> : "";
        return <div id="friendlist">
            {emptyTitle}
            {pendingTitle}
            {pendingNodes}
            {noneTitle}
            {noneNodes}
        </div>
    }
});


var Post = React.createClass({
    getInitialState: function() {
        var emotionChoices = emotionMap.map(function(emotion) {
            return 1;
        });
        return { emotionChoices: emotionChoices };
    },
    onClick: function(emotionIndex, value) {
        this.state.emotionChoices[emotionIndex] = value;
        this.setState({ emotionChoices: this.state.emotionChoices });
    },
    submit: function() {
        var result = emotionMap.map(function(emotion, index) {
            return { emotion: emotion.emotion, value: this.state.emotionChoices[index] };
        }.bind(this));
        console.log(result);
        $.ajax({
            url: API_URL + '/me/create',
            contentType: 'application/json',
            crossDomain: true,
            dataType: 'json',
            type: 'POST',
            cache: false,
            data: JSON.stringify({ data: result })
        }).done(function(data) {
            console.log(data);
        });
    },
    render: function() {
        var emotionNodes = emotionMap.map(function(emotion, index) {
            var colorBoxes = [];
            for (var i = 1; i < 6; i++) {
                var style = {
                    backgroundColor: "rgba(" + emotion.color + "," + (i * .16) + ")"
                };
                if (this.state.emotionChoices[index] == i) {
                    style.border = "1px solid white";
                }
                colorBoxes.push(<div key={i} style={style} onClick={this.onClick.bind(this, index, i)}className="box"></div>);
            }
            return (
                <div key={emotion.emotion} className={emotion.emotion + " emotion"}>
                    {colorBoxes}
                    <span className="emotion-name">{emotion.emotion}</span> 
                </div>);
        }.bind(this));
        return <div id="post">
                <h2>create</h2>
                {emotionNodes}
                <div className="btn btn-primary" onClick={this.submit} >post</div>
            </div>
    }
});

var Feed = React.createClass({
    getInitialState: function() {
        return { feed: [] }
    },
    componentDidMount: function() {
        $.get(API_URL + '/status', function(feed) {
            this.setState({ feed : feed });
        }.bind(this));
    },
    render: function() {
        var statusNodes = this.state.feed.map(function(status) {
            return <Status user_id={status.user_id} user_name={status.name} picture={status.profile_url} date={status.createdAt} data={status.data} />;
        });
        return <div id="feed">
            <h1>feed</h1>
            <div className="statusContainer">{statusNodes}</div>
        </div>
    }
});

var Status = React.createClass({
    render: function() {
        console.log(this.props.data);
        return <div className="status">
            <div className="friend">
                <img src={this.props.picture} className="img-circle img-responsive"/>
                <span className="userName">{this.props.user_name}</span>
            </div>
            <div className="summary">
                <span className="emotionbox">{this.props.data[0].emotion} {this.props.data[0].value}</span>
                <span className="emotionbox">{this.props.data[1].emotion} {this.props.data[1].value}</span>
                <span className="emotionbox">{this.props.data[2].emotion} {this.props.data[2].value}</span>
                <span className="emotionbox">{this.props.data[3].emotion} {this.props.data[3].value}</span>
                <span className="emotionbox">{this.props.data[4].emotion} {this.props.data[4].value}</span>
            </div>
        </div>
    }
});

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
