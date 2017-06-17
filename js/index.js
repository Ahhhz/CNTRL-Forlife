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





  const updateProgress = (e) => {
      if (e.lengthComputable) {
          const percentLoaded = Math.round((e.loaded / e.total) * 100);
          // Increase the progress bar length.
          if (percentLoaded < 100) {
              progress.style.width = percentLoaded + '%';
              progress.textContent = percentLoaded + '%';
          }
      }
  }

  //RENDER IMAGE AND POST CALL TO API
  function processSelectedFiles(files) {
    const reader = new FileReader();
    for (const file of files) {
      console.log(files, 'FILELIST HERE IN FOR LOOP');
      console.log("Filename: " + file.name);
      console.log("Type: " + file.type);
      console.log("Size: " + file.size + " bytes");
      reader.readAsDataURL(file)
      reader.onload = ((file) => {
          console.log(file, "FILE IN RENDER");
          // console.log(e, "e IN THUMBNAIL");
          return (e) => {
              console.log(reader, "READER");
              console.log(e,"IN EVENT IN CB");
              const {target} = e
              const form = document.createElement('form');
              const container = document.querySelector('.js-container')

              form.innerHTML = `<img class = "thumb" alt="${file.name}" src="${target.result}">
            `
              container.appendChild(form)
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
                console.log(data.responses,"RESPONSE")
              })
          }
      })(file); // END render thumbnail.
    }//END FOR OF LOOP
  }//END processSelectedFiles()

  // reader.addEventListener("load", function() {
  //   // console.log(reader.result)
  //   // call ajax here
  //   POST('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBHE9OOovbPznCiU_W3pFlsW4OjfNTmKmE', {
  //     requests: [{
  //       image: {
  //         content: reader.result.split('data:image/jpeg;base64,').pop()
  //       },
  //       features: [{
  //         type: "TEXT_DETECTION",
  //       }]
  //     }]
  //   }).then((data) => {
  //     console.log(data.responses)
  //   })
  // }, false);

  //DRAG AND DROP
   const dropzone = document.querySelector('#dropzone')
   dropzone.addEventListener("dragover", (e) => {
       e.preventDefault();
   }, false);
   
   dropzone.addEventListener("drop", (e) => {
     e.preventDefault();
     const {dataTransfer} = e
     const {files} = dataTransfer
     processSelectedFiles(files)
   })
   //END DRAG AND DROP

   //CHOOSE FILE
  document.querySelector('#fileupload').addEventListener('change', (e) => {
    const {target} = e
    console.log(e);
    const {files} = target
    processSelectedFiles(files)
  })//END CHOOSE FILE

})();
