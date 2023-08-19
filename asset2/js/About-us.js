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

    window.addEventListener("mouseup", function(e){
      if(e.target !== i)  m.classList.remove("mobile")
  
    })
  }
 

  let search_icon = document.querySelector(".search-icon")
  let search_box = document.querySelector(".search-box")
  let search = document.querySelector(".search")
  search_icon.onclick = function(){
    this.classList.toggle("show")
    search.classList.toggle("show")
    search_box.classList.toggle("show")

    window.addEventListener("mouseup", function(e){
      if(e.target !== search_icon && e.target !== search_box) {
        search_icon.classList.remove("show")
        search_box.classList.remove("show")
        search.classList.remove("show")
      }
      
    })
  }
  
 
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