// import Vue from 'vue'
// import {
//   preview
// } from '@/api'

export default function openPreview(href, title) {
  // console.log(Vue.route)
  // let {
  //   href
  // } = Vue.$router.resolve({
  //   path: `${preview}/${fileId}`
  // })
  console.log(href)

  let newWindow = window.open(href)
  newWindow.document.title = title
}
