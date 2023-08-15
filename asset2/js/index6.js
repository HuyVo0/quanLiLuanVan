window.onscroll = function() {

    let top = document.querySelector(".top")
    if (document.documentElement.scrollTop > 100 ) {
        top.style = "visibility: visible; opacity: 1"
      }
      else{
        top.style = "unset"
      }

    let h = document.getElementById("header")
    if (document.documentElement.scrollTop > 140 ) {
      h.classList.add("slidedown")
    }
    else{
      h.classList.remove("slidedown")
    }

  let info = document.querySelector("div.info")
  if (document.documentElement.scrollTop > 140 ) {
    if(window.innerWidth > 1100){
      info.classList.add("opt")
      info.onmouseover = function (){
        info.classList.remove("opt")
    }
    info.onmouseout = function (){
      info.classList.add("opt")
    }
    }
  }
  else{
    info.onmouseout = function (){
      info.classList.remove("opt")
    }
    info.classList.remove("opt")
  }

}

window.onload = function(){
  fetch("asset2/json/menu.json").then(res => res.json()).then(data => {
    let a="";
    let c = 1;
    for(let m of data){
      if(c == 1) a+=`<li><a href="${m.href}">${m.name}</a></li>`
      else{
        a+=`<li><a href="${m.href}" target="_blank">${m.name}</a></li>`  
      }
      c++;
    }
    let b = document.querySelector("ul.menu")
    b.innerHTML+=a;

  })

  

  
  $(document).ready(() => {
    fetch("asset2/json/project.json").then(res=>res.json()).then(data => {
      let a="";
      for(let p of data){
        a+=`
        <div class="NDleft">
            <img class="lazy" data-original="${p.img}" alt="">
            <p>
                MSSSV: ${p.MSSV} <br>
                Ho ten: ${p.name} <br>
                Ten luan: ${p.nameprj} <br>
            </p>
        </div>
        `
      }
      let b = document.querySelector(".NDlq")
      b.innerHTML=a;
    })


    fetch("asset2/json/project.json").then(res=>res.json()).then(data => {
    let a="";
    for(let p of data){
      a+=`
      <div class="NDleft">
          <img class="lazy" data-original="${p.img}" alt="">
          <p>
              MSSSV: ${p.MSSV} <br>
              Ho ten: ${p.name} <br>
              Ten luan: ${p.nameprj} <br>
          </p>
      </div>
      `
    }
      $(".NDgd").html(a);
      $("img.lazy").lazyload({
        effect: "fadeIn",
        event: "mouseover touchstart",
      });   
  
    })


    $("div.download").click(() => {
      window.location.href ="index3.html"
    })
  
  })
    

    let e = document.querySelector(".info")
    e.onclick = function() {
      if(window.innerWidth <= 700) {
        e.classList.toggle("mobile")
      }
  }

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

