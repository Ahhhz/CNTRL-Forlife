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
          console.log('DATA HERE')
          img.addEventListener('click', (e) => {
            overLay(e, img)
            const {responses} = data
            const text = responses[0].textAnnotations
            const ogDimensions = responses[0].fullTextAnnotation.pages[0]
            const {width, height} = ogDimensions


            handleText(text).forEach((current) => {
              const [v1, v2, v3, v4] = current;
              const {x,y} = v1;

              const imgWidth = document.querySelector('.thumb-zoom').width;
              const imgHeight = document.querySelector('.thumb-zoom').height;

              const topX = (imgWidth/width)*x
              const topY = (imgHeight/height)*y
              console.log(topX,"X",topY,"Y");

              const div = document.createElement('div')
              div.style.position = "absolute"
              div.style.width = "10px"
              div.style.height = "10px"
              div.style.border = "1px solid green"
              div.style.backgroundColor = 'rgba(0,255,0, 0.5)'
              div.style.zIndex = '10'
              div.style.top = topY + "px"
              div.style.left = topX + "px"
               document.querySelector('.js-image-container').appendChild(div)
            });
          })

          // console.log(height,width)
          // console.log(text,"THIS IS ONLY text")

      })
    })
  }//END FOR OF LOOP
}//END processSelectedFiles()



const handleText = (text) => {
  return text.slice(1).map((item) => {
    return item.boundingPoly.vertices
  })
}


const overLay = (e, img) => {
    const {target} = e
    const {classList} = target
    classList.remove('thumb');
    classList.add('thumb-zoom')
    const imageCont = document.querySelector('.js-image-container');
    imageCont.style.display = 'block';
    imageCont.appendChild(img)
}
