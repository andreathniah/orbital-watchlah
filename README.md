# WatchLah

Simple web application that helps movie-goers who are unsure or unable to decide what to watch to identify this season’s popular movies at one glance through popularity leaderboard and customized polls.

## Description

During casual gatherings, choosing movies often prove to be a chore – especially when the group cannot come into a consensus on the movie they would like to go together for. This web application aims to provide minimalistic platform whereby users can identify this season’s popular movies at one glance and facilitate a consensus among groups of people through polling.

## Installation

```
git clone https://github.com/andreathniah/orbital-watchlah.git
cd orbital-watchlah
yarn install
cd client
yarn install
cd ..
yarn dev
```

[Google's Firebase Realtime Database](https://firebase.google.com/products/realtime-database/) is required. After the set up, create `.env` file at `/client` with the appropriate content from Firebase.

It should follow the format below:

```
REACT_APP_PROXY_URL=
REACT_APP_OMD_KEY=
REACT_APP_MDB_KEY=
REACT_APP_FIREBASE_KEY=
REACT_APP_FIREBASE_DOMAIN=
REACT_APP_FIREBASE_URL=
```

## Build With

- [NodeJS](http://www.dropwizard.io/1.0.2/docs/) - Web framework used
- [ReactJS](https://reactjs.org/) - Front-end JS library for building UI
- [Firebase](https://firebase.google.com/) - Realtime database used
- [Cors-Anywhere](https://github.com/Rob--W/cors-anywhere) - Proxy server used for scraping

## Authors

- Andrea Thniah [@andreathniah](http://www.andreathniah.com/)
- Bai Yunwei [@baiyunwei1996](https://github.com/baiyunwei1996)

## License

This project is licensed under the MIT License.
