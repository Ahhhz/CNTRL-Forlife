import {processSelectedFiles} from './app'


  //DRAG AND DROP
   const dropzone = document.querySelector('#dropzone')
   dropzone.addEventListener("dragover", (e) => {
       e.preventDefault();
   });

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
    const {files} = target
    processSelectedFiles(files)
  })//END CHOOSE FILE
