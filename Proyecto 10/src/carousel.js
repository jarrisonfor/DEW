class Carousel {
    constructor() {
        this.carouselItems = [
            'img/test.png',
            'img/test.png',
            'img/test.png',
            'img/test.png',
            'img/test.png',
            'img/test.png',
        ];
        this.carousel = $('.carousel ul');
        this.carouselItems.forEach(src => {
            let li = $('<li></li>');
            li.css('background-image', `url(${src})`);
            this.carousel.append(li);
        });
        this.carouselChild = this.carousel.find('li');
        this.carouselClickCount = 0;
        this.carouselItemWidth = this.carousel.find('li:first').width() + 4;
        this.setIntervalProperty();
    }

    nextCarouselImage = (speed) => {
        this.carouselClickCount++;
        this.carousel.finish().animate({
            left: '-=' + this.carouselItemWidth
        }, speed, () => {
            let lastItem = this.carousel.find('li:first');
            lastItem.remove().appendTo(this.carousel);
            lastItem.css('left', ((this.carouselChild.length - 1) * (this.carouselItemWidth)) + (this.carouselClickCount * this.carouselItemWidth));
        });
    }

    setIntervalProperty = () => {
        clearInterval(this.carouselInterval);
        this.carouselInterval = setInterval(() => {
            this.nextCarouselImage('slow');
        }, 3000);
    }

    previousCarouselImage = (speed = 300) => {
        this.carouselClickCount--;
        let lastItem = this.carousel.find('li:last');
        lastItem.remove().prependTo(this.carousel);
        lastItem.css('left', this.carouselItemWidth * this.carouselClickCount);
        this.carousel.finish().animate({
            left: '+=' + this.carouselItemWidth
        }, speed);
    }

    init = () => {
        this.carouselChild.each((i, e) => {
            $(e).css('left', this.carouselItemWidth * this.carouselChild.index($(e)));
        });
        $('.btnPrevious').click(() => {
            this.setIntervalProperty();
            this.previousCarouselImage();
        });
        $('.btnNext').click(() => {
            this.setIntervalProperty();
            this.nextCarouselImage();
        });
    }

}

let carousel = new Carousel();
carousel.init();
