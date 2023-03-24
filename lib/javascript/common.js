$(document).ready(function(){
    $('#dep1 > li').hover(function() {
        $(this).children('.dep2_menu').stop().slideDown(200);
    }, function(){
        $(this).children('.dep2_menu').stop().slideUp(200);
    });

    //메인 비주얼 리스트
    let visual_list = document.querySelectorAll('.visual_list > li');
    let slide_dot = document.querySelectorAll('.slide_dot > li');
    let cnt2 = 0
    function main_visual(){
        
        cnt2 = cnt2 % visual_list.length;
        remove(visual_list);
        visual_list[cnt2].classList.add('on');
        remove(slide_dot);
        slide_dot[cnt2].classList.add('on');

    }

    slide_dot.forEach(function(element, index){
        element.addEventListener("click", function(){
            clearInterval(intervalID2);
            cnt2 = index;

            main_visual();
            intervalID2 = setInterval(function(element){
                cnt2++
                cnt2 = cnt2 % visual_list.length;
                main_visual();
            }, 3000);
        })
    })
    

    let intervalID2 = null; // 추가: setInterval() 함수의 ID를 저장하는 변수
    intervalID2 = setInterval(function(element){
        cnt2++
        cnt2 = cnt2 % visual_list.length;
        main_visual();
    }, 3000);

    // 섹션1 무한슬라이더
    let slider_list = document.querySelector('.img_list');
    let slider_list_item = document.querySelectorAll('.img_list > li');
    let sec1_arrow = document.querySelectorAll('.sec1 .arrow > div');
    let cnt3 = 1;
    let item_width = 376 + 40;

    // Copy first and last slide
    let firstChild = slider_list.firstElementChild;
    let lastChild = slider_list.lastElementChild;
    let clonedFirst = firstChild.cloneNode(true);
    let clonedLast = lastChild.cloneNode(true);
        
    // Add copied Slides
    slider_list.appendChild(clonedFirst);
    slider_list.insertBefore(clonedLast, slider_list.firstElementChild);
    slider_list.style.transform = `translate3d(-${item_width}px, 0px, 0px)`;
    sec1_arrow.forEach(function(element, index){
        element.addEventListener("click",function(){
            if(element.classList.contains('prev')){//이전
                if(cnt3 != 0){
                    cnt3--;
                    slider_list.style.transition = "300ms";
                    slider_list.style.transform = "translate3d(-"+ (item_width * cnt3) + "px, 0px, 0px)";
                }else{
                    // 복사한 마지막 이미지일 때, 천천히 이전 이미지로 이동하는 애니메이션 효과를 줍니다.
                    cnt3 = slider_list_item.length - 2;
                    slider_list.style.transition = "none";
                    slider_list.style.transform = "translate3d(-"+ (item_width * cnt3) + "px, 0px, 0px)";
                    
                    setTimeout(function() {
                        slider_list.style.transition = "300ms";
                        slider_list.style.transform = "translate3d(-"+ (item_width * cnt3) + "px, 0px, 0px)";
                    }, 50);
                }
            }else{//이후
                if(cnt3 < (slider_list_item.length - 1)){
                    cnt3++;
                    slider_list.style.transition = 300 + "ms";
                    slider_list.style.transform = "translate3d(-" + (item_width * cnt3) + "px, 0px, 0px)";
                }else{
                         // 복사한 첫번째 이미지일 때, 천천히 다음 이미지로 이동하는 애니메이션 효과를 줍니다.
                    cnt3 = 1;
                    slider_list.style.transition = "none";
                    slider_list.style.transform = "translate3d(-"+ (item_width * cnt3) + "px, 0px, 0px)";
                    setTimeout(function() {
                        slider_list.style.transition = "300ms";
                        slider_list.style.transform = "translate3d(-"+ (item_width * cnt3) + "px, 0px, 0px)";
                    }, 50);
                }
            }
        });
    })

    //섹션 2 slide
    let sec2_slide_left = document.querySelectorAll('.sec2 .left .slide_box');
    let sec2_slide_right = document.querySelectorAll('.sec2 .right .slide_box');
    let sec2_arrow = document.querySelectorAll('.sec2 .arrow > div');
    let cnt = 0;
    let sum = sec2_slide_left.length - 1;
    let intervalID = null; // 추가: setInterval() 함수의 ID를 저장하는 변수


    sec2_arrow.forEach(function(element){
        element.addEventListener("click", function(){
            if(element.classList.contains('prev')){
                clearInterval(intervalID);
                if(cnt == 0){
                    cnt = sum;
                }else{
                    cnt--;
                }
                slideFunc();
                intervalID = setInterval(function(){
                    cnt++;
                    cnt = cnt % sec2_slide_left.length;
                    slideFunc();
                }, 3000);
                
            }else{
                clearInterval(intervalID);
                if (cnt >= sum) {
                    cnt = 0;
                }else{
                    cnt++;
                }
                slideFunc();
                intervalID = setInterval(function(){
                    cnt++;
                    cnt = cnt % sec2_slide_left.length;
                    slideFunc();
                }, 3000);
            }
        });
    });


    function slideFunc() { // 추가: 슬라이드 변경 함수
        cnt = cnt % sec2_slide_left.length;     
        
        remove(sec2_slide_left);
        sec2_slide_left[cnt].classList.add('on');

        remove(sec2_slide_right);
        sec2_slide_right[cnt].classList.add('on');
    }

    function remove(element){
        element.forEach(function(idx){
            idx.classList.remove('on');
        });
    }

    intervalID = setInterval(function(){
        cnt++;
        cnt = cnt % sec2_slide_left.length;
        slideFunc();
    }, 3000);
});