import {POST} from './ajax';

const getFileData = (file) => {

return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      resolve({file, e, reader});
    }
  })
};

 //RENDER IMAGE AND POST CALL TO API
export function processSelectedFiles(files) {
  for (const file of files) {
    getFileData(file).then(({file, e, reader}) => {
      const {target} = e
      const div = document.createElement('div');
      const container = document.querySelector('.js-container')

      div.innerHTML = `<img class = "thumb" alt="${file.name}" src="${target.result}">

    `
      container.appendChild(div).addEventListener('click',(e) => {
        console.log(e);
      })
      console.log(div.querySelector('img').getAttribute('src'))
      POST('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBHE9OOovbPznCiU_W3pFlsW4OjfNTmKmE', {
        requests: [{
          image: {
            content: div.querySelector('img').getAttribute('src').split('data:image/jpeg;base64,').pop()
          },
          features: [{
            type: "TEXT_DETECTION",
          }]
        }]
      }).then((data) => {
        console.log(data.responses,"RESPONSE")
      })
    })
  }//END FOR OF LOOP
}//END processSelectedFiles()
