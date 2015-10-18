// React
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
            <Profile />
        </div>
    }
});

var Profile = React.createClass({
    render: function() {
        return <div id="profile"></div>
    }
});

var Navigation = React.createClass({
    render: function() {
        return <div id="navigation">
            <h1 className="title">lyte</h1>
            <ul>
                <li id="notifications">notifications</li>
                <li id="friends">friends</li>
                <li id="settings">settings</li>
                <li id="post">new status</li>
            </ul>
    </div>
    }
});

var Omnibox = React.createClass({
    render: function() {
        return <div>Friend</div>
    }
});

var Feed = React.createClass({
    render: function() {
        return <div id="feed">
            <h1>news feed</h1>
            <Status />
            <Status />
            <Status />
            <Status />
            <Status />
            <Status />
            <Status />
        </div>
    }
});

var Status = React.createClass({
    render: function() {
        return <div className="status">Status</div>
    }
});

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
