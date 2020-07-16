import React from 'react';
import Slider from "react-slick";
import MoodBoard from './MoodBoard/MoodBoard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SlideList.css';

class SlideList extends React.Component {
    componentDidMount(){
        var $slideList = this;
        var colElements = new Array();

        function createResearchContent() {
            var researchContentWrapper = document.getElementById("researchList");
            var gridElements = "";
            var gridLength = 5;
            var colLength = 23;

            if (researchContentWrapper.childElementCount === 0) {
                for (var i = 1; i <= gridLength; i++) {
                    gridElements += `
                    <li class="grid-con">
                        <div class="grid-inner">
                            <ul class="list-wrap">
                            </ul>
                        </div>
                    </li>
                    `;
                }
                researchContentWrapper.innerHTML = gridElements;
            }

            for (var j = 0; j < gridLength; j++) {
                colElements.push("");
                for (var k = 1; k <= colLength; k++) {
                    var randomImageNumber = Math.floor(Math.random() * colLength) + 1;
                    colElements[j] += `
                    <li class="list-con">
                        <div class="list-inner">
                            <button class="thumbnail">
                                <img src="/images/${process.env.PUBLIC_URL + "/images/example"+ randomImageNumber +".jpg"}" alt="thumbnail">
                            </button>
                        </div>
                    </li>`;
                }
                researchContentWrapper.children[j].querySelector('.list-wrap').innerHTML = colElements[j];
                var thumbnails = researchContentWrapper.children[j].querySelectorAll('.thumbnail');
                thumbnails.forEach(function(thumbnail, idx){
                    thumbnail.addEventListener('click', function(){
                        var thumbnailSrc = this.querySelector("img").src;
                        $slideList.click(thumbnailSrc);
                    });
                });
            }
        }

        createResearchContent();

        function addToListItems() {
            var scrollTop = window.scrollY;
            var itemWrappers = document.querySelectorAll('#researchList .grid-con');
            var wrapperMinHeight = itemWrappers[0].clientHeight;
            var screenHeight = window.height;
            for (var i = 0; i < itemWrappers.length; i++) {
                if (itemWrappers[i].clientHeight < wrapperMinHeight && itemWrappers[i].clientHeight !== 0) {
                    wrapperMinHeight = itemWrappers[i].clientHeight;
                }
            }
            var addPointSum = wrapperMinHeight - screenHeight;
            var scrollTopSum = scrollTop + screenHeight;

            if (addPointSum < scrollTopSum) {
                createResearchContent();
                researchContentClickEvent();
            }
        }

        window.onscroll = function () {
            addToListItems();
        }

        function researchContentClickEvent() {
            var thumbnailClass = ".research-list-area .list-grid-area .thumbnail";
            var thumbnails = document.querySelectorAll(thumbnailClass);
            thumbnails.forEach(function (thumbnail, idx) {
                thumbnail.addEventListener("click", function () {
                    var thumbnailImage = thumbnail.querySelector('img');
                    var thumbnailWidth = thumbnailImage.width;
                    var thumbnailHeight = thumbnailImage.height;
                    var collectionSlideWrapper = document.querySelector('.research-collection-area');
                    var collectionThumbnailHieght = collectionSlideWrapper.clientHeight;
                    var thumbnailRatio = collectionThumbnailHieght / thumbnailHeight;
                    var thumbnailTransitionWidth = Math.floor(thumbnailWidth * thumbnailRatio);
                    var thumbnailContainer = thumbnail.closest('.list-con');
                    var thumbnailInner = thumbnail.closest('.list-inner');

                    thumbnailContainer.classList.add('selected');

                    function thumbnailFixedPosition() {
                        var thumbnailDomRect = thumbnail.getBoundingClientRect();
                        var thumbnailTop = thumbnailDomRect.top - window.scrollY;
                        var thumbnailLeft = thumbnailDomRect.left - window.scrollX;
                        thumbnailInner.style.top = thumbnailTop + 'px';
                        thumbnailInner.style.left = thumbnailLeft + 'px';
                        thumbnailInner.style.width = thumbnailContainer.clientWidth + 'px';
                        setTimeout(() => {
                            thumbnailMoving();
                        }, 0);
                    }

                    function collectionSlideMoving() {
                        var collectionSlide = collectionSlideWrapper.querySelector('.slick-slide')
                        var collectionSlideStyle = collectionSlide.currentStyle || window.getComputedStyle(collectionSlide);
                        var collectionThumbnailMarginRight = parseInt(collectionSlideStyle.marginRight.replace("px",""));
                        var collectionThumbnailWidthSum = thumbnailTransitionWidth + collectionThumbnailMarginRight;
                        collectionSlideWrapper.style.paddingLeft = collectionThumbnailWidthSum + 'px';
                        collectionSlideWrapper.classList.add('active');
                    }

                    function thumbnailMoving() {
                        var collectionDomRect = collectionSlideWrapper.getBoundingClientRect();
                        var collectionTop = collectionDomRect.top;
                        var collectionLeft = collectionDomRect.left;
                        thumbnailInner.style.top = collectionTop + 'px';
                        thumbnailInner.style.left = collectionLeft + 'px';
                        thumbnailInner.style.width = thumbnailTransitionWidth + 'px';
                        setTimeout(() => {
                            addToCollectionSlide();
                        }, 500);
                    }

                    function addToCollectionSlide() {
                        thumbnailContainer.remove();
                        collectionSlideWrapper.style.paddingLeft = '0px';
                        collectionSlideWrapper.classList.remove('active');
                    }

                    thumbnailFixedPosition();
                    collectionSlideMoving();
                    addToListItems();
                });
            });
        }

        researchContentClickEvent();
        
        function openMoodBoard() {
            var btn = document.getElementById('moodBoardOpenBtn');
            btn.addEventListener('click', function () {
                openModalPopup('moodBoardPopup');
                setTimeout(() => {
                    // createMoodBoardItemList();
                }, 250);
            });
        }

        openMoodBoard();

        function closeMoodBoard() {
            var btn = document.getElementById('moodBoardCloseBtn');
            btn.addEventListener('click', function () {
                closeModalPopup('moodBoardPopup');
            });
        }

        closeMoodBoard();

        function openModalPopup(target) {
            var elem = document.getElementById(target);
            var html = document.getElementsByTagName('html');
            elem.style.display = "block";
            html[0].style.overflowY = "hidden";
        }

        function closeModalPopup(target) {
            var elem = document.getElementById(target);
            var html = document.getElementsByTagName('html');
            elem.style.display = "none";
            html[0].style.overflowY = "auto";
        }
        /*
        function createMoodBoardItemList() {
            var moodBoardListWrapper = document.getElementById('moodBoardListArea');
            var collectionSlideList = document.querySelectorAll('.research-collection-area .slick-slide');
            var gridSizer = document.querySelector('.modal-popup-area .modal-thumbnail-grid-area .modal-thumbnail-grid-sizer').clientWidth;
            var gridAreaWidth = moodBoardListWrapper.clientWidth;
            var gridLength = Math.round(gridAreaWidth / gridSizer);
            var gridHtml = '';
            
            for(var i = 0; i < gridLength; i++){
                gridHtml += `
                <li class="modal-thumbnail-grid-con">
                    <div class="modal-thumbnail-grid-inner">
                        <ul class="modal-thumbnail-list-wrap"></ul>
                    </div>
                </li>
                `;
            };
            moodBoardListWrapper.innerHTML = gridHtml;
            
            var gridElements = document.querySelectorAll('.modal-popup-area .modal-thumbnail-grid-area .modal-thumbnail-grid-con');
            var gridArr = new Array();
            var gridIdx = 0;
            var imgSrc;
            collectionSlideList.forEach(function (elem, idx) {
                imgSrc = elem.querySelector('img').getAttribute('src');
                if (idx < gridLength){
                    gridArr.push("");
                }
                if (gridLength <= gridIdx){
                    gridIdx = 0;
                }
                gridArr[gridIdx] += `
                <li class="modal-thumbnail-list-con">
                    <div class="modal-thumbnail-list-inner">
                        <button class="modal-thumbnail"><img src="${imgSrc}" alt="thumbnail" id="moodBoardThumbnail-${idx}"></button>
                    </div>
                </li>
                `;
                gridIdx++;
            });
            gridElements.forEach(function (gridElem, gridIdx) {
                gridElem.querySelector('.modal-thumbnail-list-wrap').innerHTML = gridArr[gridIdx];
            });
        }
        */
    }
    constructor(props) {
        super(props);
        this.state = {
          slides: [
            "/images/example22.jpg",
            "images/example2.jpg",
            "images/example12.jpg",
            "images/example11.jpg",
            "images/example14.jpg",
            "images/example3.jpg",
            "images/example1.jpg",
            "images/example4.jpg",
            "images/example6.jpg",
            "images/example7.jpg",
            "images/example9.jpg",
          ],
        };
        this.click = this.click.bind(this);
    }
    click(thumbnailSrc) {
        const slidesArray = this.state.slides;
        const $this = this;
        slidesArray.unshift(thumbnailSrc);
        setTimeout(function(){
            $this.setState({
                slides: slidesArray,
                slickGoTo: 0,
            });
        }, 500);
    }
    render(){
        const settings = {
            dots: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
        };
        return (
        <div>
            <div className="research-header">
                <div className="title-wrap">
                    <h3 className="title">Title area</h3>
                    <div className="button-wrap">
                        <button id="moodBoardOpenBtn">
                            <img src="/images/icon.png" alt="open mood board" />
                        </button>
                    </div>
                </div>
                <div className="research-collection-area">
                    <Slider {...settings}>
                    {this.state.slides.map(function (slide) {
                        return (
                        <div key={slide}>
                            <button className="thumbnail">
                                <img src={slide} alt="thumbnail" />
                            </button>
                        </div>
                        );
                    })}
                    </Slider>
                </div>
            </div>
            <div className="research-list-area">
                <div className="list-grid-area">
                    <ul id="researchList" className="grid-wrap clearfix"></ul>
                </div>
            </div>
            <div id="moodBoardPopup" className="modal-popup-area">
                <div className="modal-popup-wrap">
                    <div className="modal-popup-con">
                        <div className="modal-close-button-wrap">
                            <button id="moodBoardCloseBtn"><span>close mood board</span></button>
                        </div>
                        <div className="modal-popup-inner">
                            <div className="modal-thumbnail-grid-area">
                                <div id="moodBoardListArea" className="clearfix">
                                    <MoodBoard/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-bottom-button-wrap">
                    <div className="modal-bottom-button-con">
                        <button id="moodBoardDeleteZone" className="delete">삭제하기</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default SlideList
