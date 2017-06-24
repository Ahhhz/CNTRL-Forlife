import {POST} from './ajax';
import Fuse from 'fuse.js';

//GETS FILE DATA IN PROMISE AND READS IMAGE DATA AS URL
const getFileData = (file) => {
return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      resolve({file, e, reader});
    }
  })
};


const arr = [];
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






            handleText(text).forEach(({current, text}) => {
              //VERTICES FOR OUR div box around each word
              const [v1, v2, v3, v4] = current;
              const {x,y} = v1;
              const{x:x2, y:y2} = v2;
              const{x:x3, y:y3} = v3;
              const{x:x4, y:y4} = v4;//
              // console.log(current,text,"_______");

              //COMPUTED IMAGE width&height
              const compImgWidth = document.querySelector('.thumb-zoom').width;
              const compImgHeight = document.querySelector('.thumb-zoom').height;

              //CALCULATION FOR OUR WORD BOX
              const topX = (compImgWidth/width)*x;
              const topY = (compImgHeight/height)*y;
              const styleW = (x2-x);
              const styleY = (y3-y2);
              //

              //CREATE DIV AROUND EACH WORD IN IMAGE
              const imgContainer = document.querySelector('.js-image-container')
              const div = document.createElement('div')
                    div.classList.add('js-box', `js-word-${text.toLowerCase()}`)
                    div.setAttribute('data-text', text)
                    div.style.width = styleW + "px"
                    div.style.height = styleY + "px"
                    div.style.top = topY + "px"
                    div.style.left = topX + "px"
                    imgContainer.appendChild(div)



               arr.push({
                 title: text
               })
            });//FOR EACH

             const input = document.getElementById('js-search')

            //ENABLE SEARCH WITH FUSE USING TITLE AS KEYS
            const fuse = new Fuse(arr, {
              shouldSort: true,
              threshold: 0.1,
              location: 0,
              distance: 100,
              maxPatternLength: 32,
              minMatchCharLength: 1,
              keys: [
                "title",
              ]
            })

            //SEARCH WITH FUSE ON INPUT
           input.addEventListener('change', (e) => {
             const{target} = e
             const{value} = target
             const search = value
             const result = fuse.search(search)
             const [payOff] = result
             console.log(payOff,"PAY");
             const {title} = payOff
             console.log(title,"HERE IN SEARCH")
             Array.from(document.querySelectorAll('.js-box')).forEach(el => el.style.opacity = '0');
             Array.from(document.querySelectorAll(`.js-word-${title.toLowerCase()}`)).forEach(el => el.style.opacity = '1')
           })//END ONCHANGE EVENT

          })//EVENTLISTENER
      })//END POST PROMISE
    })// END GET and READ FILE DATA
  }//END FOR OF LOOP
}//END processSelectedFiles()



//HANDLES TEXT DATA FROM IMAGE
const handleText = (text) => {
  return text.slice(1).map((item) => {
    return {current: item.boundingPoly.vertices, text: item.description}
  })
}

//CREATES OUR OVERLAY VIEW OF OUR IMAGE DOCUMENT
const overLay = (e, img) => {
    const {target} = e
    const {classList} = target
    classList.remove('thumb');
    classList.add('thumb-zoom')
    const input = document.getElementById('js-search')
    const imageCont = document.querySelector('.js-image-container');
    input.style.visibility = 'visible'
    imageCont.style.display = 'block';
    imageCont.appendChild(img)
    imageCont.appendChild(input)
}
