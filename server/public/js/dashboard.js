// React
"use strict";

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

    render: function render() {
        return React.createElement("div", { id: "profile" });
    }
});

var Navigation = React.createClass({
    displayName: "Navigation",

    render: function render() {
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
                    { id: "notifications" },
                    "notifications"
                ),
                React.createElement(
                    "li",
                    { id: "friends" },
                    "friends"
                ),
                React.createElement(
                    "li",
                    { id: "settings" },
                    "settings"
                ),
                React.createElement(
                    "li",
                    { id: "post" },
                    "new status"
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

var Feed = React.createClass({
    displayName: "Feed",

    render: function render() {
        return React.createElement(
            "div",
            { id: "feed" },
            React.createElement(
                "h1",
                null,
                "news feed"
            ),
            React.createElement(Status, null),
            React.createElement(Status, null),
            React.createElement(Status, null),
            React.createElement(Status, null),
            React.createElement(Status, null),
            React.createElement(Status, null),
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
            "Status"
        );
    }
});

ReactDOM.render(React.createElement(Dashboard, null), document.getElementById('dashboard'));