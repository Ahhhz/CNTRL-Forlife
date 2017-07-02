

export const POST = (url, data) => {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.open('POST', url);
    http.setRequestHeader('Content-Type', 'application/json')
    http.onload = () => {
      try {
        const jsonData = JSON.parse(http.responseText);
        resolve(jsonData);
      } catch (e) {
        reject(e);
      }
    } // onload
    http.send(JSON.stringify(data));
  });
} //POST


const APIKEY = 'key=';
const PROTOCOL = 'https:';
const APIVERSION = 'v1';
const BASEURL = 'vision.googleapis.com';
const QUERY = 'images:annotate?';

export const URL = `${PROTOCOL}${BASEURL}/${APIVERSION}/${QUERY}${APIKEY}`
