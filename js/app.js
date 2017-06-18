import {POST} from './ajax';
// import {mapper} from './apiMapper'

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
      console.log("HERE BEFORE DATA");
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
          const img = document.querySelector('img')
          img.addEventListener('click',(e) => overLay(e,img))
          const {responses} = data
          const text = responses[0].textAnnotations
          const ogDimensions = responses[0].fullTextAnnotation.pages[0]

          Object.keys(ogDimensions).map((val) => {
            const dimensions = ogDimensions[val]
            console.log(dimensions,"!!!!!!!!!");
            console.log(typeof dimensions)
            const [height,width] = dimensions
            console.log([height,width]);
          })
          console.log("WORD BY WORD:",text,"FULL TEXT:",ogDimensions)

      })
    })
  }//END FOR OF LOOP
}//END processSelectedFiles()




const overLay =  (e, img) => {
  const {target} = e
  const {classList} = target
  classList.remove('thumb');
  classList.add('thumb-zoom')
  const imageCont = document.querySelector('.js-image-container');
    imageCont.style.display = 'block';
    imageCont.appendChild(img)
  }
