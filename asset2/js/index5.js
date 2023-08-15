// window.onscroll = function() {
//     let a = document.getElementById("header")
//     if (document.documentElement.scrollTop > 130 ) {
//         a.style = "position: fixed; width: 99%"
//       }
//       else{
//         a.style = "position: static"
//       }
// };

window.onscroll = function() {
    let a = document.querySelector(".top")
    if (document.documentElement.scrollTop > 100 ) {
        a.style = "visibility: visible; opacity: 1"
      }
      else{
        a.style = "unset"
      }
    let b = document.getElementById("header")
    if (document.documentElement.scrollTop > 140 ) {
        b.classList.add("slidedown")
      }
      else{
        b.classList.remove("slidedown")
      }
};

window.onload = function() {
  let m = document.querySelector("ul.menu")
  let i = document.querySelector(".mobile-nav")
  i.onclick = function() {
    m.classList.toggle("mobile")
  }
  window.addEventListener("mouseup", function(e){
    if(e.target !== i)  m.classList.remove("mobile")

  })

}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    }

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }