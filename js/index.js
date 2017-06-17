import {processSelectedFiles} from './app'


  const updateProgress = (e) => {
      if (e.lengthComputable) {
          const percentLoaded = Math.round((e.loaded / e.total) * 100);
          // Increase the progress bar length.
          if (percentLoaded < 100) {
              progress.style.width = percentLoaded + '%';
              progress.textContent = percentLoaded + '%';
          }
      }
  }

  //DRAG AND DROP
   const dropzone = document.querySelector('#dropzone')
   dropzone.addEventListener("dragover", (e) => {
       e.preventDefault();
   }, false);

   dropzone.addEventListener("drop", (e) => {
     e.preventDefault();
     const {dataTransfer} = e
     const {files} = dataTransfer
     processSelectedFiles(files)
   },false)
   //END DRAG AND DROP

   //CHOOSE FILE
  document.querySelector('#fileupload').addEventListener('change', (e) => {
    const {target} = e
    console.log(e);
    const {files} = target
    processSelectedFiles(files)
  })//END CHOOSE FILE

  // document.querySelector('.thumb').addEventListener('click',(e) => {
  //   console.log(e);
  // })
