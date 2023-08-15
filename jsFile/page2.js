function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// hàm lấy data từ json================================================================================================
function getDataFromJSON() {
    return fetch('./json/esay.json') // Đường dẫn tới file JSON
      .then(response => response.json()) // Chuyển đổi dữ liệu thành mảng JavaScript
      .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
      });
  }



//   hàm lấy data từ json và chuyển vào mảng
 function getListEasay() {
    let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
    
    if (listEasay.length === 0) {
      getDataFromJSON()
        .then(data => {
          // Gán dữ liệu từ hàm getDataFromJSON vào listEasay
          listEasay = data;
          // Lưu lại listEasay vào localStorage để sử dụng sau này
          localStorage.setItem("list-easay", JSON.stringify(listEasay));
           window.location.reload();
        });
        
    } 
  }  

  getListEasay();

// hàm kiểm tra dữ liệu nhập đã hợp lệ chưa ============================================================================================
function validateInput() {
    let formElement = document.querySelector('#form-1');
    let inputElements = formElement.querySelectorAll('.form-control');
    inputElements.forEach(function(inputElement){
        if(inputElement.value === "") {
            inputElement.parentElement.classList.add('invalid');
            inputElement.parentElement.querySelector('.form-message').innerText = "Vui lòng nhập trường này";
        }
        else {
            inputElement.parentElement.classList.remove('invalid');
            inputElement.parentElement.querySelector('.form-message').innerText = "";
        }
        inputElement.oninput = function() {
            inputElement.parentElement.classList.remove('invalid');
            inputElement.parentElement.querySelector('.form-message').innerText = "";
        };
    });

}


// hàm thêm 1 luận văn mới vào =================================================================
function addNew() {
    validateInput();
    let formElement = document.querySelector('#form-1');
    let errorElements = formElement.querySelectorAll('.form-message');
    let arrErrorMessage = [];
    for (let i = 0; i < errorElements.length; i++) {
        arrErrorMessage.push(errorElements[i].innerText);
    }
    
    let checkErrorMessage = arrErrorMessage.every(function(value) {
        return value === "";
    });
    if (checkErrorMessage) {
        let name = formElement.querySelector('#fullname').value;
        let studentCode = formElement.querySelector('#MSSV').value;
        let easayName = formElement.querySelector('#projectname').value;
        let downloadNumbers = getRandomNumber(5, 50);
        let viewNumbers = getRandomNumber(40, 100);
        let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
       // thêm ngày
        let currentDate = new Date();
        let formattedDate = formatDate(currentDate);
       
       
        listEasay.unshift({
            name: name,
            MSSV: studentCode,
            easayName: easayName,
            dateAdded: formattedDate,
            downloadNumbers: downloadNumbers,
            viewNumbers: viewNumbers
        });
        localStorage.setItem("list-easay", JSON.stringify(listEasay));
        renderEasy(listEasay);
        eventHandler();
    }
};

// hàm trả về chuổi ngày tháng=============================================================================
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year} `;
}

// hàm render ra màn hình =================================================================================================
function renderEasy(array) {
    
    let easays ="";
    array.map(function (value, index) {
        easays += `<div class="graduation-essay-item-wrapper">
                        <div class="graduation-essay-item animate__animated animate__fadeInUp flex">
                            <div class="essay-item-img">
                                <div class="img"></div>
                            </div>
                            <div class="student-code">
                                <span>${value.MSSV}</span>
                            </div>
                            <div class="author-name">
                                <h3>${value.name} </h3>
                            </div>
                            <div class="project-name">
                                <p>${value.easayName}</p>

                            </div>
                            <div class="graduation-essay-item__option center-row">
                                <div data-index="${index}" class="graduation-essay-item-icon more-icon center-col">
                                    <i class="ti-more graduation-essay-item-option-icon"></i>
                                </div>
                                <div class="graduation-essay-item-icon close-icon center-col">
                                    <i class="ti-close graduation-essay-item-option-icon"></i>
                                </div>

                            </div>
                        
                        </div>
                        <form action="POST" class="formm close" id="form-2">
                            <div class="form-group">
                                <label for="fullname" class="form-label">Tên đầy đủ</label>
                                <input id="fullname" name="fullname" placeholder="Nguyễn Văn A" class="form-control" type="text">
                                <span class="form-message"></span>
                            </div>
                            <div class="form-group">
                                <label for="MSSV" class="form-label">Mã số sinh viên</label>
                                <input id="MSSV" name="MSSV" placeholder="2251052047" class="form-control" type="text">
                                <span class="form-message"></span>
                            </div>
                            <div class="form-group">
                                <label for="projectname" class="form-label">Tên luận văn</label>
                                <input id="projectname" name="projectname" placeholder="Tên project" class="form-control" type="text">
                                <span class="form-message"></span>
                            </div>
                            <button class="form-submit"> Cập nhật </button>
                            <div class="form-close">
                                <i class="ti-angle-up"></i>
                            </div>
                        </form>
                    </div>`
    });
    document.querySelector('.graduation-essay-item-wrapper').innerHTML = easays;
    eventHandler();
}

// hàm chỉnh sửa thông tin luận văn======================================================================================
function editEssay(element, index) {
    let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
    let formmElement = element.parentElement.querySelector('#form-2');
    formmElement.querySelector('#fullname').value = listEasay[index].name;
    formmElement.querySelector('#MSSV').value = listEasay[index].MSSV;
    formmElement.querySelector('#projectname').value = listEasay[index].easayName;
}
function changeEssay(element, index) {
    let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
    let formmElement = element.parentElement.querySelector('#form-2');
    let newName = formmElement.querySelector('#fullname').value;
    
    let newMSSV = formmElement.querySelector('#MSSV').value;
    let newEasayName = formmElement.querySelector('#projectname').value;
     listEasay[index] = {
        name: newName,
        MSSV: newMSSV,
        easayName: newEasayName
     }
    localStorage.setItem("list-easay", JSON.stringify(listEasay));
    renderEasy(listEasay);
    eventHandler();
}


// hàm delete essay================================================================================================
function deleteEssay(index) {
    let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
    listEasay.splice(index, 1);
    localStorage.setItem("list-easay", JSON.stringify(listEasay));
    renderEasy(listEasay);
}

// Hàm Loại Bỏ Dấu Tìm Trên GITHUP =================================================================
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d"); 
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}




// hàm tìm kiếm essay ======================================================================================================
// function searchEssayName(inputValue) {
//     let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
//     let essaySearch = listEasay.filter(function (itemValue) {
//         return removeVietnameseTones(itemValue.easayName.toUpperCase()).includes(removeVietnameseTones(inputValue.toUpperCase()));
//     });

//     renderEasy(essaySearch);
// }

// function searchAuthorName(inputValue) {
//     let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
//     let essaySearch = listEasay.filter(function (itemValue) {
//         return removeVietnameseTones(itemValue.name.toUpperCase()).includes(removeVietnameseTones(inputValue.toUpperCase()));
//     });
//     renderEasy(essaySearch);
// }

// function searchMSSV(inputValue) {
//     let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
//     let essaySearch = listEasay.filter(function (itemValue) {
//         return itemValue.MSSV.includes(inputValue);
//     });
//     renderEasy(essaySearch);
// }


function searchEssayName(inputValue1, inputValue2, inputValue3) {
        let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
        let essaySearch = listEasay.filter(function (itemValue) {
            let check1=  removeVietnameseTones(itemValue.easayName.toUpperCase()).includes(removeVietnameseTones(inputValue1.toUpperCase()));
            let check2 =   removeVietnameseTones(itemValue.name.toUpperCase()).includes(removeVietnameseTones(inputValue2.toUpperCase()));
            let check3 =   itemValue.MSSV.includes(inputValue3);
            return check1 && check2 && check3;
        });
        renderEasy(essaySearch);
    }