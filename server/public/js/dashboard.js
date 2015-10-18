// React
"use strict";

var emotionMap = [{ emotion: "excited", color: "135, 211, 124" }, { emotion: "happy", color: "253, 238, 0" }, { emotion: "angry", color: "242, 38, 19" }, { emotion: "stressed", color: "242, 121, 53" }, { emotion: "bored", color: "102, 51, 153" }];

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
            React.createElement(Navigation, null),
            React.createElement(Profile, null)
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
                    "+new status"
                )
            )
        );
    }
});

var Omnibox = React.createClass({
    displayName: "Omnibox",

    render: function render() {
        return React.createElement(
            "div",
            null,
            "Friend"
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
                "button",
                { onClick: this.submit },
                "post"
            )
        );
    }
});

var Feed = React.createClass({
    displayName: "Feed",

    componentDidMount: function componentDidMount() {
        // ajax this.props.url (status)
    },
    render: function render() {
        return React.createElement(
            "div",
            { id: "feed" },
            React.createElement(
                "h1",
                null,
                "feed"
            ),
            React.createElement(Status, null)
        );
    }
});

var Status = React.createClass({
    displayName: "Status",

    render: function render() {
        return React.createElement(
            "div",
            { className: "status" },
            React.createElement(
                "div",
                { className: "friend" },
                React.createElement("img", { src: "http://www.plentyperfect.com/wp-content/uploads/2012/06/gravatar-300x300_thumb.jpg" }),
                React.createElement(
                    "p",
                    null,
                    "Daniel Fang"
                )
            ),
            React.createElement("div", { className: "summary" })
        );
    }
});

ReactDOM.render(React.createElement(Dashboard, null), document.getElementById('dashboard'));