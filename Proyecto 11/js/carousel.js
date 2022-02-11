class Carousel {
    nextCarouselImage = (speed) => { // Function to move the carousel to the next image
        this.carouselClickCount++;
        this.carousel.finish().animate({
            left: '-=' + this.carouselItemWidth
        }, speed, () => {
            let lastItem = this.carousel.find('li:first');
            lastItem.remove().appendTo(this.carousel);
            lastItem.on('click', function() {
                session.setCookie('product_id', $(this).data('id'), 1);
                document.location.href = '/html/product.html';
            });
            lastItem.css('left', ((this.carouselChild.length - 1) * (this.carouselItemWidth)) + (this.carouselClickCount * this.carouselItemWidth));
        });
    }

    setIntervalProperty = () => { // Function to set the interval of the carousel
        clearInterval(this.carouselInterval);
        this.carouselInterval = setInterval(() => {
            this.nextCarouselImage('slow');
        }, 3000);
    }

    previousCarouselImage = (speed = 300) => { // Function to move the carousel to the previous image
        this.carouselClickCount--;
        let lastItem = this.carousel.find('li:last');
        lastItem.remove().prependTo(this.carousel);
        lastItem.on('click', function() {
            session.setCookie('product_id', $(this).data('id'), 1);
            document.location.href = '/html/product.html';
        });
        lastItem.css('left', this.carouselItemWidth * this.carouselClickCount);
        this.carousel.finish().animate({
            left: '+=' + this.carouselItemWidth
        }, speed);
    }

    init = () => { // Function to initialize the carousel
        $.ajax({
            method: 'GET',
            url: '/server/products.php',
            success: (data) => {
                this.carousel = $('.carousel ul');
                data.forEach(product => {
                    let li = $(`<li data-id="${product.id}"></li>`);
                    li.css('background-image', `url(${product.picture})`);
                    li.on('click', () => {
                        session.setCookie('product_id', product.id, 1);
                        document.location.href = '/html/product.html';
                    });
                    this.carousel.append(li);
                });
                this.carouselChild = this.carousel.find('li');
                this.carouselClickCount = 0;
                this.carouselItemWidth = this.carousel.find('li:first').width() + 4;
                this.setIntervalProperty();
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
        });
    }

}

let carousel = new Carousel();
carousel.init();
