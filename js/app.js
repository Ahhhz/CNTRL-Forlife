import {POST,URL} from './ajax';
import {handleChange} from './search';


// GETS FILE DATA IN PROMISE AND READS IMAGE DATA AS URL
const getFileData = (file) => {
return new Promise((resolve, reject) => {
  const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      resolve({file, e, reader});
    }
  })
};

export const arr = [];
const input = document.getElementById('js-search');
 //RENDER IMAGE AND POST CALL TO API
export function processSelectedFiles(files) {

   const container = document.querySelector('.js-container')

  for (const file of files) {
    getFileData(file).then(({file, e, reader}) => {
      const {target,loaded,lengthComputable} = e
      const div = document.createElement('div');


      div.innerHTML = `
      <div>${file.name}</div>
      <img class="thumb" alt="${file.name}" src="${target.result}"/>
    `
      container.appendChild(div);


      POST(URL,{
        requests: [{
          image: {
            content: div.querySelector('img').getAttribute('src').split('data:image/jpeg;base64,').pop()
            },
          features: [{
            type: "TEXT_DETECTION",
            }]
          }]
        })
        .then((data) => {
          const img = document.querySelector('img')

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
              const{x:x4, y:y4} = v4;


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

            //SEARCH WITH FUSE ON INPUT
           input.addEventListener('change', (e,title) => {
             handleChange(e,title)
           })//END ONCHANGE EVENT
         })//CLICK EVENTLISTENER
          img.click();
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

//CREATES OUR OVERLAY VIEW OF OUR IMAGE DOCUMENT e {target,classList} point to the evt for classLists
const overLay = (e, img) => {
    const {target} = e
    const {classList} = target
    classList.remove('thumb');
    classList.add('thumb-zoom')
    const imageCont = document.querySelector('.js-image-container');
    input.style.visibility = 'visible'
    imageCont.style.display = 'block';
    imageCont.appendChild(img)
    imageCont.appendChild(input)
}//END OVERLAY
