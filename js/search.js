import Fuse from 'fuse.js'
import {arr} from './app'

//HANDLE CHANGE ON INPUT WITH FUSE.JS
export const handleChange = (e) => {
  const fuse = new Fuse(arr, {
    shouldSort: true,
    threshold: 0.0,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "title",
    ]
  })
  const{target} = e
  const{value} = target
  const search = value
  const result = fuse.search(search)
  const [payOff] = result
  console.log(payOff,"PAY");
  const {title} = payOff
  Array.from(document.querySelectorAll('.js-box')).forEach(el => el.style.opacity = '0');
  Array.from(document.querySelectorAll(`.js-word-${title.toLowerCase()}`)).forEach(el => el.style.opacity = '1')
}//END ONCHANGE
