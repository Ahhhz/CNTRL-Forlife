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
              const [v1, v2, v3, v4] = current;
              const {x,y} = v1;
              const{x:x2, y:y2} = v2;
              const{x:x3, y:y3} = v3;
              const{x:x4, y:y4} = v4;

              console.log('TEXT is', text)

              // console.log(current)

              console.log("THIS IS X2 & Y2:",x2,y2);

              console.log("________________________");

              console.log("THIS IS X3 & Y3:",x3,y3);
              console.log("________________________");

              console.log("THIS IS X4 & Y4:",x4,y4);

              console.log(x2-x,"diff between x2-x");

              console.log(y3-y2,"diff between y3-y2");

              console.log("___________END__________");



              const compImgWidth = document.querySelector('.thumb-zoom').width;
              const compImgHeight = document.querySelector('.thumb-zoom').height;

              const topX = (compImgWidth/width)*x
              const topY = (compImgHeight/height)*y

              console.log(topX,"topX",topY,"topY");

              const div = document.createElement('div')
                    div.classList.add('js-box', `js-word-${text.toLowerCase()}`)
              div.setAttribute('data-text', text)
              div.style.position = "absolute"
              div.style.width = (x2-x) + "px"
              div.style.height = (y3-y2) + "px"
              div.style.border = "1px solid green"
              // div.style.backgroundColor = 'rgba(0,255,0, 0.5)'
              div.style.zIndex = '10'
              div.style.top = topY + "px"
              div.style.left = topX + "px"
               document.querySelector('.js-image-container').appendChild(div)
            });
          })

      })
    })
  }//END FOR OF LOOP
}//END processSelectedFiles()



const handleText = (text) => {
  return text.slice(1).map((item) => {
    console.log(item,"THIS IS EACH ITEM IN TEXT");
    return {current: item.boundingPoly.vertices, text: item.description}
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





// I don't have the API response in front of me so this is approximate
// given:

// {
//     v1: {x: 10, y: 15},
//     v2: {x: 30, y:15},
//     v3: {x:30, y: 0},
//     v4: {x: 10, y: 0},
// }

// Notice that v1.y and v2.y are the same right? This means you can cacluate
// the *width* of your box by subtracting v2.x - v1.x
// Same approach for the y axis.
// I assume that's what has you tripped up. Let me know if you run into issues and catch
// me early in class tmr if possible.
// I think I told ling I'd speak to her first but you can be next in line
