// React
var emotionMap = [
    { emotion: "excited", color: "135, 211, 124" },
    { emotion: "happy", color: "253, 238, 0" },
    { emotion: "angry", color: "242, 38, 19" },
    { emotion: "stressed", color: "242, 121, 53" },
    { emotion: "bored", color: "102, 51, 153" },
];

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
                <li onClick={this.onClick.bind(this, "c")} id="create-post">+new status</li>
            </ul>
    </div>
    }
});

var Omnibox = React.createClass({
    render: function() {
        return <div>Friend</div>
    }
});

var Post = React.createClass({
    render: function() {
        var emotionNodes = emotionMap.map(function(emotion) {
            var colorBoxes = [];
            for (var i = 1; i < 6; i++) {
                var style = {
                    backgroundColor: "rgba(" + emotion.color + "," + (i * .16) + ")"
                };
                console.log(style);
                colorBoxes.push(<div key={i} style={style} className="box"></div>);
            }
            return (
                <div key={emotion.emotion} className={emotion.emotion + " emotion"}>
                    {colorBoxes}
                    <span className="emotion-name">{emotion.emotion}</span> 
                </div>);
        });
        return <div id="post">
                <h2>create</h2>
                {emotionNodes}
            </div>
    }
});

var Feed = React.createClass({
    render: function() {
        return <div id="feed">
            <h1>feed</h1>
            <Status />
        </div>
    }
});

var Status = React.createClass({
    render: function() {
        return <div className="status">
            <div className="friend">
                <img src="http://www.plentyperfect.com/wp-content/uploads/2012/06/gravatar-300x300_thumb.jpg"/>
                <p>Daniel Fang</p>
            </div>
            <div className="summary"></div>
        </div>
    }
});

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
