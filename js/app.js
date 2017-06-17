import {POST} from './ajax';

 //RENDER IMAGE AND POST CALL TO API
export function processSelectedFiles(files) {
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
