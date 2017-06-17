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

    //DRAG AND DROP
    const dropzone = document.querySelector('#dropzone')


    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
    }, false);

    // const handleFileSelect = () => {
     dropzone.addEventListener("drop", (e) => {
       const container = document.querySelector('.js-container')
        // cancel default actions
        e.preventDefault();
         console.log(e,"E")
        let i = 0,
          files = e.dataTransfer.files,
          len = files.length;
        console.log(files, 'FILES HERE!!!');
        // const reader = new FileReader();
        for (const file of files) {
          console.log(file, 'SINGLE FILE HERE IN FOR LOOP');
          console.log("Filename: " + files[i].name);
          console.log("Type: " + files[i].type);
          console.log("Size: " + files[i].size + " bytes");
          const reader = new FileReader();
          reader.readAsDataURL(file)
          reader.onload = ((file) => {
            console.log(file,"FILE IN RENDER");
              console.log(e,"e IN THUMBNAIL");
              return function (e) {
                console.log(file);
                const div = document.createElement('div');

                div.innerHTML = `<img class = "thumb" alt="${file.name}" src="${e.target.result}">
                `
                container.appendChild(div)
              }
              // Render thumbnail.
          })(file);
        }
      })
    //  }//END DRAG AND DROP


      // function processSelectedFiles(e) {
      //   const files = e.target.files;
      //   const reader = new FileReader();
      //
      //   for (let i = 0; i < files.length; i++) {
      //     console.log("Filename " + files[i].name,files[i]);
      //     reader.readAsDataURL(files[i])
      //     reader.addEventListener("load", function() {
      //       // console.log(reader.result)
      //       // call ajax here
      //       POST('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBHE9OOovbPznCiU_W3pFlsW4OjfNTmKmE', {
      //         requests: [{
      //           image: {
      //             content: reader.result.split('data:image/jpeg;base64,').pop()
      //           },
      //           features: [{
      //             type: "TEXT_DETECTION",
      //           }]
      //         }]
      //       }).then((data) => {
      //         console.log(data.responses)
      //       })
      //     }, false);
      //
      //   }
      // }
      //
      // const dropzone = document.querySelector('#dropzone')
      //
      // dropzone.ondrop = (e) => {
      //   e.preventDefault()
      //   this.className = 'js-dropzone';
      //   processSelectedFiles()
      // };
      //
      // dropzone.ondragover = () => {
      //   this.className = 'js-dropzone js-dragover';
      //   return false;
      // };
      //
      // dropzone.ondragleave = () => {
      //   this.className = 'js-dropzone';
      //   return false;
      // }

      // document.querySelector('.js-dropzone').addEventListener('change', processSelectedFiles)
      // document.querySelector('#dropzone').addEventListener('change', handleFileSelect, false);
    })();
