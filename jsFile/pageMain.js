const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        
        const sliderWrapper = $('.slide');
    
        const nextPageBtns = $$('.next-page-icon.next-btn');
        
        const prevPageBtns = $$('.next-page-icon.prev-btn');
        const essayblock = $('.essay-block-item');
        const essayblockwidth = essayblock.offsetWidth;
        
        const inputBlock = $('.header2-search');
        const headerTop = $('.header2-navbar');
        const headerInput = $('.header2-navbar__search');

        // const essayListWrapper = $('.essay-list');

        const modelCloseBtn = $('.model-close-icon');
        const modelWrapperContent = $('.model-wrapper-content');
        let positionX = 0;

    //  hàm lấy element cha==============================================

        function getParent(element, selector) {
            while (element.parentElement) {
                if(element.parentElement.matches(selector))  {
                    return element.parentElement;
                } 
                else 
                {
                    element = element.parentElement; 
                }
            }
        };
        function getDataFromJSON() {
            return fetch('./json/esay.json') // Đường dẫn tới file JSON
              .then(response => response.json()) // Chuyển đổi dữ liệu thành mảng JavaScript
              .catch(error => {
                console.error('Đã xảy ra lỗi:', error);
              });
          }
         function getListEasay() {
            let listEasay = localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [];
            
            if (listEasay.length === 0) {
              getDataFromJSON()
                .then(data => {
                  // Gán dữ liệu từ hàm getDataFromJSON vào listEasay
                  listEasay = data;
                  // Lưu lại listEasay vào localStorage để sử dụng sau này
                  localStorage.setItem("list-easay", JSON.stringify(listEasay));
                  
                   console.log("helo");
                   window.location.reload();
                });
                
            } 
          }  
        
          getListEasay();
          





        const mainPage = {
            listEasay: localStorage.getItem("list-easay") ? JSON.parse(localStorage.getItem("list-easay")) : [],
            latestArray : localStorage.getItem("latest-array") ? JSON.parse(localStorage.getItem("latest-array")) : [],
            // hàm render ra màn hình================================================================================================
            render: function() {
                const htmls = this.listEasay.map(function(essay,index) {
                    return `
                        <div class="col-20 center-col margin-both-sides essay-block-item  scale ">
                            <div data-index ="${index}" class="essay-block">
                                <div class="essay-content">
                                    <img src="./asset/img/luanVanimg.jpg" alt="">
                                </div>
                                <div title="${essay.easayName}" class="essay-leter center-col">
                                    <span><span>MSSV: </span>${essay.MSSV}</span>
                                    <span><span>Tên: </span>${essay.name}</span>
                                    <h3><span>Tên luận: </span>${essay.easayName}</h3>
                                </div>
                            
                            </div>
                        </div>
                        `
                })
                sliderWrapper.innerHTML = htmls.join(' ');
            },
           


            // hàm thêm dải băng mới (NEW) ============================================================================================
            addNewbar: function() {
                
                sliderWrapper.querySelectorAll('.essay-block-item').forEach(function(value){
                    let data = value.querySelector('.essay-block').dataset.index;
                    if(parseInt(data) <= 2) {
                        value.classList.add('newest');
                    }
                });
            },
           


            // Hàm Loại Bỏ Dấu Tìm Trên GITHUP ===========================================================================
            removeVietnameseTones: function(str) {
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
            },
           



            
            // hàm tìm kiếm==========================================================================================================
            searching: function(inputValue) {
                const _this = this;
                let essayWrappers = $$('.essay-block');
                
                for (let index = 0; index < essayWrappers.length; index++) {
                    let essayWrapper = essayWrappers[index];
                    let essayName = essayWrapper.querySelector('h3').innerText;
                    
                    if (_this.removeVietnameseTones(essayName.toUpperCase()).includes(_this.removeVietnameseTones(inputValue.toUpperCase()))) {
                        positionX = 0;
                        sliderWrapper.style = `transform: translateX(0px);`;
                        if ((index + 1) > essayWrappers.length) {
                            positionX = -(essayblockwidth + 74) * (essayWrappers.length - 4);
                            sliderWrapper.style = `transform: translateX(${positionX}px);`;
                        }else  {
                            
                                positionX = -(essayblockwidth + 74) * (index -1) ;
                            
                            
                            sliderWrapper.style = `transform: translateX(${positionX}px);`;
                        }
                        if(inputValue ==='') {
                            positionX = 0;
                            sliderWrapper.style = `transform: translateX(0px);`;
                        }
                    
                        break; 
                    }
                }
                
                    for (let index = 0; index < essayWrappers.length; index++) {
                        let essayWrapper = essayWrappers[index];
                        let essayName = essayWrapper.querySelector('h3').innerText;
                        if (_this.removeVietnameseTones(essayName.toUpperCase()).includes(_this.removeVietnameseTones(inputValue.toUpperCase()))) {
                            setTimeout(function(){
                                essayWrappers[index].parentElement.classList.remove('searched');
                            },3000)
                            essayWrappers[index].parentElement.classList.add('searched');
                        }
                    }
                
            },
           

            // hàm ẩn hiện header phụ=====================================================================================================
            headerAper: function(){
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if(scrollTop >= 450 ) {
                    headerTop.style.top = 0;
                }
                else {
                    headerTop.style.top = `-65px`;
                }
            },
            

            // hàm hiể thị nội dung ra model=================================================================================================
            renderModelContent: function(index){
                let html = `<div>
                                <div class="model-title">
                                    <h1>${this.listEasay[index].easayName}</h1>
                                </div>
                                <div class="model-author flex row-block space-between">
                                    <div class="flex mn">
                                        <i class="ti-user"></i>
                                        <h2>${this.listEasay[index].name}</h2>
                                    </div>
                                    <div class="model-student-code">
                                        <span class="item-1">Mã Số Sinh Viên:</span>
                                        <span>${this.listEasay[index].MSSV}</span>
                                    </div>

                                </div>
                                <div class="model-desc flex">
                                    <p><i class="fa-solid fa-pen"></i> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quia natus 
                                        repellendus, tempore vitae autem, cum impedit inventore eligendi ea dignissimos
                                        aliquam assumenda at accusantium amet veritatis numquam quas ut. Lorem ipsum 
                                        dolor sit amet consectetur adipisicing elit. Eaque eius ullam, corrupti 
                                        architecto reiciendis odit voluptatem doloremque nisi consequatur laudantium 
                                        magnam veritatis sit dolor nobis ratione ipsam, qui beatae molestiae.</p>
                                </div>
                            </div>
                            <div class="model-btn flex space-between">
                                <div >
                                    <i class="ti-book"></i>
                                    <span>Trang</span>
                                </div>
                                <div>
                                    <i class="fa-regular fa-calendar-days"></i>
                                    <span> ${this.listEasay[index].dateAdded}</span>
                                </div>
                                <div>
                                    <i class="fa-solid fa-eye"></i>
                                    <span>Lượt xem ${this.listEasay[index].viewNumbers}</span>
                                </div>
                                <div>
                                    <i class="fa-solid fa-file-arrow-down"></i>
                                    <span>Lượt tải ${this.listEasay[index].downloadNumbers}</span>
                                </div>
                                <div>
                                    <i class="fa-solid fa-bars"></i>
                                </div>
                            </div>`;
                            modelWrapperContent.innerHTML = html;
                          this.eventHandler();
            },

            // hàm render ra luận văn ở "mới xem " khi bấm vào  =========================================================
            renderLatestVisit : function() {
                let html = '';
                
                this.latestArray.map(function(value){
                    html += value;
                });
                document.querySelector('.slide-latest').innerHTML = html;
            },


            //  hàm thêm vào mảng localstorage luận văn mới bấm vào =========================================================
            latestVisit: function(index){
                let _this = this;
                    let html=  `
                        <div class="col-20 center-col margin-both-sides essay-block-item">
                            <div data-index = "${index}" class="essay-block ">
                                <div class="essay-content">
                                    <img src="./asset/img/luanVanimg.jpg" alt="">
                                </div>
                                <div title="${_this.listEasay[index] .easayName}" class="essay-leter center-col">
                                    <span><span>MSSV: </span>${_this.listEasay[index].MSSV}</span>
                                    <span><span>Tên: </span>${_this.listEasay[index].name}</span>
                                    <h3><span>Tên luận: </span>${_this.listEasay[index].easayName}</h3>
                                </div>
                            
                            </div>
                        </div>
                        `;
                        this.latestArray.map(function(value,index){
                            if(value == html) {
                                
                                _this.latestArray.splice(index, 1);
                            }
                        });
                        _this.latestArray.unshift(html);
                        if (_this.latestArray.length>=8) {
                            _this.latestArray.splice(7, 1);
                        }
                        
                        localStorage.setItem("latest-array", JSON.stringify(this.latestArray));
                let htmls = '';
                this.latestArray.map(function(value){
                    htmls += value;
                });
                
                document.querySelector('.slide-latest').innerHTML = htmls;
            },

            //  hàm sự kiện=======================================================================================
            eventHandler: function() {
                const _this = this;
                // xử lí di chuyển trang-------------------------------------------------
                
                nextPageBtns.forEach(function(nextPageBtn) {
                    nextPageBtn.onclick = function() {
                        if(getParent(this,'.row90').classList.contains('content-bottom')) {
                            if(positionX <= -essayblockwidth*(_this.latestArray.length)) {
                                positionX = 0;
                            } else {
                                positionX = positionX - essayblockwidth - 75;
                            }
                        }
                        else {
                            
                            if(positionX <= -essayblockwidth*(_this.listEasay.length)) {
                                positionX = 0;
                            } else {
                                positionX = positionX - essayblockwidth - 75;
                            }
                        }
                        
                        
                        getParent(this,'.row-block').querySelector('.slide').style = `transform: translateX(${positionX}px);`;
                    };
                });
                prevPageBtns.forEach(function(prevPageBtn) {
                    prevPageBtn.onclick = function() {
                        if(positionX >= 0) {
                            positionX=0;
                        }
                        else {
    
                            positionX = positionX + essayblockwidth + 75;
                        }
                       
                        getParent(this,'.row-block').querySelector('.slide').style = `transform: translateX(${positionX}px);`;
                    };
                });

                // xử lí nhập tìm kiếm---------------------------------------------
                inputBlock.oninput = function() {
                    _this.searching(inputBlock.value);
                };
                headerInput.oninput = function() {
                    _this.searching(headerInput.value);
                };
                // xử lí cuộn trang---------------------------------------
                window.onscroll = function() {
                    _this.headerAper();
                }
                // xử lí bấm bào luận văn------------------------------------
                
                document.querySelectorAll('.essay-block').forEach(function(essay) {
                    
                    essay.onclick = function() {
                        
                        _this.latestVisit(parseInt(essay.dataset.index));
                        document.querySelector('.model').classList.remove('hide');
                        _this.renderModelContent(parseInt(essay.dataset.index));
                    };
                })
                // xử lí tắt model--------------------------------------------------
                modelCloseBtn.onclick = function() {
                    document.querySelector('.model').classList.add('hide');
                }
                document.querySelector('.model').onclick = function(e) {
                    if(e.target.classList.contains('model')) {
                        e.target.classList.add('hide');
                    }
                };
            },
             


            start: function () {
                this.render()
                this.renderLatestVisit();
                this.eventHandler();
                this.addNewbar();
                this.latestVisit();
                
            }
        }

        mainPage.start();

