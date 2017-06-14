(function() {

  const POST = (url, data) => {
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

  function processSelectedFiles(event) {
    const files = event.target.files;
    const reader = new FileReader();

    for (let i = 0; i < files.length; i++) {
      // console.log("Filename " + files[i].name, 'files[i]_________!!!',files[i]);
      reader.readAsDataURL(files[i])
      reader.addEventListener("load", function() {
        // console.log(reader.result)
        // call ajax here
        POST('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBHE9OOovbPznCiU_W3pFlsW4OjfNTmKmE', {
          requests: [{
            image: {
              content: reader.result.split('data:image/jpeg;base64,').pop()
            },
            features: [{
              type: "TEXT_DETECTION",
            }]
          }]
        }).then((data) => {
          console.log(data.responses)
        })
      }, false);

    }
  }
  document.querySelector('.fileInput').addEventListener('change', processSelectedFiles)
})();
