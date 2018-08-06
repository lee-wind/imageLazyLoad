/**
 * Created by wind on 2018/7/26.
 */
class ImgLazyLoad {
    constructor(containerEl, lazyLoadImageEl, lazyLoadImageIdentity){
        this.containerEl = containerEl;
        this.container = null;
        this.lazyLoadImageEl = lazyLoadImageEl;
        this.lazyLoadImageIdentity = lazyLoadImageIdentity;
        this.lazyLoadImages = null;
        this.lazyLoadImagesLength = 0;
        this.lastActiveImage = null;
        this.lastActiveImageIndex = -1;
        this.lastLazyLoadIndex = 0;
        this.windowInnerWidth = 0;
        this.windowInnerHeight = 0;
        this.containerClientWidth = 0;
        this.containerClientHeight = 0;
        this.init();
    }
    init(){
        if(this.containerEl === window){
            this.windowInnerWidth = window.innerWidth;
            this.windowInnerHeight = window.innerHeight;
            this.lazyLoadImages = document.body.querySelectorAll(this.lazyLoadImageEl);
            this.lazyLoadImagesLength = this.lazyLoadImages.length;
            this.lastLazyLoadIndex = this.lazyLoadImagesLength - 1;
            console.log("窗口宽度：" + this.windowInnerWidth);
            console.log("窗口高度：" + this.windowInnerHeight);
            console.log("懒加载图片数量：" + this.lazyLoadImagesLength);
            this.windowScroll();
            window.addEventListener("scroll", this.windowScroll.bind(this), false);
        }else{
            this.container = document.body.querySelector(this.containerEl);
            this.containerClientWidth = this.container.clientWidth;
            this.containerClientHeight = this.container.clientHeight,
                this.lazyLoadImages = this.container.querySelectorAll(this.lazyLoadImageEl);
            this.lazyLoadImagesLength = this.lazyLoadImages.length;
            this.lastLazyLoadIndex = this.lazyLoadImagesLength - 1;
            console.log("容器可视宽度：" + this.containerClientWidth);
            console.log("容器可视高度：" + this.containerClientHeight);
            console.log("懒加载图片数量：" + this.lazyLoadImagesLength);

            this.containerScroll();
            this.container.addEventListener("scroll", this.containerScroll.bind(this), false);
        }
    }
    windowScroll(){
        if(this.lastActiveImage){
            var lastActiveImageRect = this.lastActiveImage.getBoundingClientRect();
            if(lastActiveImageRect.bottom > this.windowInnerHeight){
                console.log("不懒加载图片");
                return;
            }
        }
        //console.log("向下滚动");
        if(this.lastActiveImageIndex <= this.lastLazyLoadIndex){
            for(var i = this.lastActiveImageIndex + 1; i < this.lazyLoadImagesLength; i++){
                //console.log("当前图片下标：" + i);
                var currentLazyLoadImage = this.lazyLoadImages[i];
                var lazyLoadImageRect = currentLazyLoadImage.getBoundingClientRect();
                if(lazyLoadImageRect.top < this.windowInnerHeight){
                    console.log("懒加载图片");
                    currentLazyLoadImage.src = currentLazyLoadImage.getAttribute(this.lazyLoadImageIdentity);
                    this.lastActiveImageIndex = i;
                    console.log("懒加载最后一张图片下标：" + this.lastActiveImageIndex);
                    this.lastActiveImage = currentLazyLoadImage;
                }else{
                    return;
                }
            }
        }
    }
    containerScroll(){
        if(this.lastActiveImage){
            var lastActiveImageBottomToContainerVisualTop = this.lastActiveImage.offsetTop + this.lastActiveImage.offsetHeight - this.container.scrollTop;
            //console.log("懒加载最后一张图底部到容器可视区域顶部的距离：" + this.lastActiveImageBottomToContainerVisualTop);
            if(lastActiveImageBottomToContainerVisualTop > this.containerClientHeight){
                console.log("不懒加载图片");
                return;
            }
        }
        //console.log("向下滚动");
        if(this.lastActiveImageIndex < this.lazyLoadImagesLength){
            for(var i = this.lastActiveImageIndex + 1; i < this.lazyLoadImagesLength; i++){
                //console.log("当前图片下标：" + i);
                var currentLazyLoadImage = this.lazyLoadImages[i];
                var lastActiveImageTopToContainerVisualTop = currentLazyLoadImage.offsetTop - this.container.scrollTop;
                //console.log("懒加载最后一张图顶部到容器可视区域顶部的距离：" + lastActiveImageBottomToContainerVisualTop);
                if(lastActiveImageTopToContainerVisualTop < this.containerClientHeight){
                    console.log("懒加载图片");
                    currentLazyLoadImage.src = currentLazyLoadImage.getAttribute(this.lazyLoadImageIdentity);
                    this.lastActiveImageIndex = i;
                    console.log("懒加载最后一张图片下标：" + this.lastActiveImageIndex);
                    this.lastActiveImage = currentLazyLoadImage;
                }else{
                    return;
                }
            }
        }
    }
}