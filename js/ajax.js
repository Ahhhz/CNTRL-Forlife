export const POST = (url, data) => {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    // const taskURL = 'https://wt-ee16a188d40ed8e5f26fd95b409f077c-0.run.webtask.io/finaltask'
    http.open('POST', url);
    // http.open('POST', taskURL + url);
    http.setRequestHeader('Content-Type', 'application/json')
    http.onload = () => {
      try {
        const data = JSON.parse(http.responseText);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    } // onload
    http.send(JSON.stringify(data));
  });
} //POST


const APIKEY ='key=AIzaSyBHE9OOovbPznCiU_W3pFlsW4OjfNTmKmE';
const PROTOCOL = 'https:';
const APIVERSION = 'v1';
const BASEURL = 'vision.googleapis.com';
const QUERY = 'images:annotate?';



export const URL = `${PROTOCOL}${BASEURL}/${APIVERSION}/${QUERY}${APIKEY}`
