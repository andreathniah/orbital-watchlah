const proxyURL = process.env.REACT_APP_PROXY_URL;
const omdKey = process.env.REACT_APP_OMD_KEY; // https://www.omdbapi.com
const mdbKey = process.env.REACT_APP_MDB_KEY; // https://www.themoviedb.org
const firebaseKey = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_URL
};

export { omdKey }; // named export
export { mdbKey };
export { firebaseKey };
export { proxyURL };
