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
      const {target,loaded} = e
      const container = document.querySelector('.js-container')
      const div = document.createElement('div');

      div.innerHTML = `<div id="progress" >${loaded}</div>
      <img class="thumb" alt="${file.name}" src="${target.result}">
      <div>${file.name}</div>
    `
      container.appendChild(div);

      ///zoom picture and draw one box over it

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
        const img = document.querySelector('img')
        img.addEventListener('click', (e) => {
           console.log(e,"HERE EVENT");
          const removeclassName = "thumb"
          const className = "thumb-zoom"
            img.classList.remove(removeclassName)
          if(removeclassName){
            img.classList.add(className)
          }
        })
      })
    })
  }//END FOR OF LOOP
}//END processSelectedFiles()
