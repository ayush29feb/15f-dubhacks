// React
"use strict";

var emotionMap = [{ emotion: "excited", color: "135, 211, 124" }, { emotion: "happy", color: "253, 238, 0" }, { emotion: "angry", color: "242, 38, 19" }, { emotion: "stressed", color: "242, 121, 53" }, { emotion: "bored", color: "102, 51, 153" }];

var API_URL = 'http://52.89.113.127:5000';

var Dashboard = React.createClass({
    displayName: "Dashboard",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Feed, null),
            React.createElement(Sidebar, null)
        );
    }
});

var Sidebar = React.createClass({
    displayName: "Sidebar",

    render: function render() {
        return React.createElement(
            "div",
            { id: "sidebar" },
            React.createElement(Navigation, null)
        );
    }
});

var Profile = React.createClass({
    displayName: "Profile",

    componentDidMount: function componentDidMount() {
        // ajax /me
    },
    render: function render() {
        return React.createElement(
            "div",
            { id: "profile" },
            React.createElement("img", { src: "http://www.plentyperfect.com/wp-content/uploads/2012/06/gravatar-300x300_thumb.jpg" })
        );
    }
});

var Navigation = React.createClass({
    displayName: "Navigation",

    getInitialState: function getInitialState() {
        return { expanded: '' };
    },
    onClick: function onClick(value) {
        this.setState({ expanded: value });
    },
    render: function render() {
        if (this.state.expanded !== '') {
            var module;
            switch (this.state.expanded) {
                case "c":
                    module = React.createElement(Post, null);
                    break;
                case "f":
                    module = React.createElement(FriendList, null);
                    break;
            };
            return React.createElement(
                "div",
                { id: "navigation" },
                React.createElement(
                    "h1",
                    { className: "title" },
                    "lyte"
                ),
                React.createElement(
                    "span",
                    { onClick: this.onClick.bind(this, ""), className: "close" },
                    "x"
                ),
                module
            );
        }
        return React.createElement(
            "div",
            { id: "navigation" },
            React.createElement(
                "h1",
                { className: "title" },
                "lyte"
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "li",
                    { onClick: this.onClick.bind(this, "n"), id: "notifications" },
                    "notifications"
                ),
                React.createElement(
                    "li",
                    { onClick: this.onClick.bind(this, "f"), id: "friends" },
                    "friends"
                ),
                React.createElement(
                    "li",
                    { onClick: this.onClick.bind(this, "s"), id: "settings" },
                    "settings"
                ),
                React.createElement(
                    "li",
                    { onClick: this.onClick.bind(this, "c"), id: "create-post" },
                    "new status"
                )
            ),
            React.createElement(
                "a",
                { id: "logout", href: "/logout" },
                React.createElement(
                    "p",
                    null,
                    "Logout"
                )
            )
        );
    }
});

var FriendList = React.createClass({
    displayName: "FriendList",

    getInitialState: function getInitialState() {
        return { none: [], pending: [] };
    },
    refreshFriends: function refreshFriends() {
        $.get(API_URL + '/friends/disconnected', (function (data) {
            this.setState({ none: data });
        }).bind(this));

        $.get(API_URL + '/friends/pending', (function (data) {
            this.setState({ pending: data });
        }).bind(this));
    },
    componentDidMount: function componentDidMount() {
        this.refreshFriends();
    },
    accept: function accept(userId) {
        console.log("accept: " + userId);
        $.ajax({
            url: API_URL + '/friend/' + userId + '/accept',
            method: 'PUT'
        }).done((function (data) {
            console.log(data);
            this.refreshFriends();
        }).bind(this));
    },
    add: function add(userId) {
        console.log("add: " + userId);
        $.ajax({
            url: API_URL + '/friend/' + userId + '/request',
            method: 'PUT'
        }).done((function (data) {
            console.log(data);
            this.refreshFriends();
        }).bind(this));
    },
    render: function render() {
        var noneNodes = this.state.none.map((function (friend) {
            return React.createElement(
                "div",
                { className: "friend" },
                React.createElement("img", { src: friend.profile_url }),
                React.createElement(
                    "p",
                    null,
                    friend.name
                ),
                React.createElement(
                    "div",
                    { onClick: this.add.bind(this, friend.id), className: "btn btn-primary" },
                    "Send Request"
                )
            );
        }).bind(this));
        var pendingNodes = this.state.pending.map((function (friend) {
            return React.createElement(
                "div",
                { className: "friend" },
                React.createElement("img", { src: friend.profile_url }),
                React.createElement(
                    "p",
                    null,
                    friend.name
                ),
                React.createElement(
                    "div",
                    { onClick: this.accept.bind(this, friend.id), className: "btn btn-primary" },
                    "Accept Request"
                )
            );
        }).bind(this));
        var pendingTitle = pendingNodes.length > 0 ? React.createElement(
            "h2",
            null,
            "Pending Requests"
        ) : "";
        var noneTitle = noneNodes.length > 0 ? React.createElement(
            "h2",
            null,
            "Suggested Friends"
        ) : "";
        var emptyTitle = pendingTitle == "" && noneTitle == "" ? React.createElement(
            "h2",
            null,
            "nothing new here"
        ) : "";
        return React.createElement(
            "div",
            { id: "friendlist" },
            emptyTitle,
            pendingTitle,
            pendingNodes,
            noneTitle,
            noneNodes
        );
    }
});

var Post = React.createClass({
    displayName: "Post",

    getInitialState: function getInitialState() {
        var emotionChoices = emotionMap.map(function (emotion) {
            return 1;
        });
        return { emotionChoices: emotionChoices };
    },
    onClick: function onClick(emotionIndex, value) {
        this.state.emotionChoices[emotionIndex] = value;
        this.setState({ emotionChoices: this.state.emotionChoices });
    },
    submit: function submit() {
        var result = emotionMap.map((function (emotion, index) {
            return { emotion: emotion.emotion, value: this.state.emotionChoices[index] };
        }).bind(this));
        console.log(result);
        $.ajax({
            url: API_URL + '/me/create',
            contentType: 'application/json',
            crossDomain: true,
            dataType: 'json',
            type: 'POST',
            cache: false,
            data: JSON.stringify({ data: result })
        }).done(function (data) {
            console.log(data);
        });
    },
    render: function render() {
        var emotionNodes = emotionMap.map((function (emotion, index) {
            var colorBoxes = [];
            for (var i = 1; i < 6; i++) {
                var style = {
                    backgroundColor: "rgba(" + emotion.color + "," + i * .16 + ")"
                };
                if (this.state.emotionChoices[index] == i) {
                    style.border = "1px solid white";
                }
                colorBoxes.push(React.createElement("div", { key: i, style: style, onClick: this.onClick.bind(this, index, i), className: "box" }));
            }
            return React.createElement(
                "div",
                { key: emotion.emotion, className: emotion.emotion + " emotion" },
                colorBoxes,
                React.createElement(
                    "span",
                    { className: "emotion-name" },
                    emotion.emotion
                )
            );
        }).bind(this));
        return React.createElement(
            "div",
            { id: "post" },
            React.createElement(
                "h2",
                null,
                "create"
            ),
            emotionNodes,
            React.createElement(
                "div",
                { className: "btn btn-primary", onClick: this.submit },
                "post"
            )
        );
    }
});

var Feed = React.createClass({
    displayName: "Feed",

    getInitialState: function getInitialState() {
        return { feed: [] };
    },
    componentDidMount: function componentDidMount() {
        $.get(API_URL + '/status', (function (feed) {
            this.setState({ feed: feed });
        }).bind(this));
    },
    render: function render() {
        var statusNodes = this.state.feed.map(function (status) {
            return React.createElement(Status, { user_id: status.user_id, user_name: status.name, picture: status.profile_url, date: status.createdAt, data: status.data });
        });
        return React.createElement(
            "div",
            { id: "feed" },
            React.createElement(
                "h1",
                null,
                "feed"
            ),
            React.createElement(
                "div",
                { className: "statusContainer" },
                statusNodes
            )
        );
    }
});

var Status = React.createClass({
    displayName: "Status",

    render: function render() {
        console.log(this.props.data);
        return React.createElement(
            "div",
            { className: "status" },
            React.createElement(
                "div",
                { className: "friend" },
                React.createElement("img", { src: this.props.picture, className: "img-circle img-responsive" }),
                React.createElement(
                    "span",
                    { className: "userName" },
                    this.props.user_name
                )
            ),
            React.createElement(
                "div",
                { className: "summary" },
                React.createElement(
                    "span",
                    { className: "emotionbox" },
                    this.props.data[0].emotion,
                    " ",
                    this.props.data[0].value
                ),
                React.createElement(
                    "span",
                    { className: "emotionbox" },
                    this.props.data[1].emotion,
                    " ",
                    this.props.data[1].value
                ),
                React.createElement(
                    "span",
                    { className: "emotionbox" },
                    this.props.data[2].emotion,
                    " ",
                    this.props.data[2].value
                ),
                React.createElement(
                    "span",
                    { className: "emotionbox" },
                    this.props.data[3].emotion,
                    " ",
                    this.props.data[3].value
                ),
                React.createElement(
                    "span",
                    { className: "emotionbox" },
                    this.props.data[4].emotion,
                    " ",
                    this.props.data[4].value
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(Dashboard, null), document.getElementById('dashboard'));