Dubhacks 15f - Team Tmux
===

## The Team
- Daniel Fang (danielfang.org)
- Justin Harjanto (justinharjanto.com)
- Ayush Saraf
- Vardhaman Mehta
- Divye Jain

## Tech
- Amazon AWS (EC2) - Ubuntu
- Facebook Graph API (Authentication)
- PostgreSQL
- Node.js + Express.js
- D3.js
- React.js
- Bootstrap
- HTML/CSS

# From Devpost

## Inspiration

When coming up with Lyte, we felt dissatisfied by existing social networks. Facebook, as James Whittaker mentioned, is slowly becoming a place for people to show off about their lives. Twitter is a place for people to be clever -- even that is growing more slowly than ever. We believed that a better, more true-to-life alternative existed for people to express themselves, one less constrained by social stigma and pedigree. We came up with Lyte, an emotions tracking social network. 

## What it does

Lyte allows friends, family, coworkers to express themselves in a variety of emotions. Words are hard -- it's magnitudes more difficult to know how to say something, than how to feel something. When people are suicidal or depressed, the most painful experience they manage is the feeling that no one is there for them. In many ways, Lyte allows friends to be more socially responsible and responsive to the signals of their peers. That's why we believe Lyte is the best alternative for personal expression out there. You log in with Facebook, and are presented with a list of friends you would like in your intimate list of connections. From there, you are prompted to share your current emotional state. Additionally, you get a glance-able dashboard populated with how your friends are doing on a daily or weekly timeline. In the future, we see a notification and messaging system integrated with the product, where  emotions act as conversation starters.

## How I built it

We built all the components of Lyte from scratch, starting from the Postgresql datastore to the API and Web server in Node.js to the front end in React, d3.js and HTML/CSS. Of course we leveraged the many tools at our disposal like Amazon EC2, Facebook's Graph API, Bootstrap, Express JS, and a SQL ORM. However, because we wanted a larger degree of control over the models, endpoints, and authentication, we chose to stick to as bare of a setup as time permitting for our goals.

## Challenges I ran into

We wanted to cover a lot of areas with very little time. We wanted architectural control from a technical perspective, but we also wanted to stick true to our philosophy that Lyte would be of high social value. We wanted to provide users with visualization, analytics, networking, and a very comforting atmosphere to share their more private emotions in. Reaching all these goals while wrangling with the standard tech/design/collaboration speed bumps was challenging.

## Accomplishments that I'm proud of

We're proud of building an end to end product from the models to the API to the React-based front end. At times it seemed like none of our components would come together in time. We're proud that we built a product that helps our peers not only at their happiest moments, but could aid them in their more stressful and upsetting times. We're proud that we worked nonstop throughout the night to build a stable (as possible given the time) and flexible social network.

## What I learned

Each of our team members got a unique learning experience at Dubhacks 2015. Some of us reached into front-end and design work when they were primarily devops and backend. We worked with new SQL to Javascript ORM interfaces to manage our models and API. We managed to learn about data visualization techniques and information presentation. All in all, we each took away a valuable, concrete skill to use in our own personal projects and lives.

## What's next for Lyte

We hope to spend a short amount of time getting the key features Lyte needs to succeed in the real world (messaging, notifications, mobile support) before getting it as fast as possible to end users. We feel like on college campuses in particular, peer influence is extremely powerful and we want to leverage that in a way that helps people ubiquitously. We want to explore exploits of our system and see how we deal with abuse as it arises in any social network. Ultimately, we want to do as much as possible to see people enjoying the value they get from being able to express themselves more easily and without as much inhibition.

