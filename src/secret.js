const proxyURL = process.env.PROXY_URL;
const omdKey = process.env.OMD_KEY; // https://www.omdbapi.com
const mdbKey = process.env.MDB_KEY; // https://www.themoviedb.org
const firebaseKey = {
	apiKey: process.env.FIREBASE_KEY,
	authDomain: process.env.FIREBASE_DOMAIN,
	databaseURL: process.env.FIREBASE_URL
};

export { omdKey }; // named export
export { mdbKey };
export { firebaseKey };
export { proxyURL };
