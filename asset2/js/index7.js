$(document).ready(() =>{
  
  $("div.left").on({
    click: function(){
      successfully_admin();
    }
  },"button.login"
)

  $("div.left").on({
    keypress: function(e){
      if(e.which == 13){
         successfully_admin();
      }
    }
  },"input"
)


  $("div.ND").mousemove(() =>{
    $("div.login button").css("background", "linear-gradient(to right, #6dd5ed, #2193b0)")

  })
  $("div.ND").mouseout(() =>{
    $("div.login button").css("background", "lightgray")

  })

})

window.onload = function() {
  let m = document.querySelector("ul.menu")
  let i = document.querySelector(".mobile-nav")
  i.onclick = function() {
    m.classList.toggle("mobile")
  }
  window.addEventListener("mouseup", function(e){
    if(e.target !== i)  m.classList.remove("mobile")

  })
  
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
  
}

function successfully_admin(){
  var a = $('#select').find(":selected").text();
  if(a == "Quan tri vien"){
    if($("input#username").val()=="admin" && $("input#password").val()=="admin"){
      window.location.href = "index.html";
    }
    else{
        fail($("span#fail"))    
    }
  }
}

function fail(x){
  let f = `<div style="color: gold;">
            Ten tai khoan hoac mat khau sai.
          </div>`
  x.html(f);
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}