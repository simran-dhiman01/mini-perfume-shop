import { useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    
    return () => {
      if (swiperInstance) {
        try {
          swiperInstance.destroy(true, true);
        } catch (error) {
          console.log('Swiper cleanup error:', error);
        }
      }
    };
  }, []);

  const carouselSlides = [
    {
      image: "/Big-sale-perfume.jpg",
      title: "Summer Sale",
      description: "Up to 50% off on selected perfumes",
      link: "/products?category=sale",
      buttonText: "Shop Sale"
    },
    {
      image: "/For-him.jpg",
      title: "For Him",
      description: "Discover our Luxury collection for Him",
      link: "/products?category=men",
      buttonText: "Shop Men"
    },
    {
      image: "/Perfume-her.jpg",
      title: "For Her",
      description: "Explore Top Picks for Her",
      link: "/products?category=women",
      buttonText: "Shop Women"
    }
  ];

  return (
    <>
      {/* Sale Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-4 py-2 sm:px-6 sm:py-3">
          <div className="flex flex-col items-center justify-center space-y-2">
            {/* Main Sale Text */}
            <div className="flex items-center space-x-3">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              <h2 className="font-comic text-xl sm:text-2xl md:text-3xl font-bold text-white">
                <span className="animate-pulse">🔥</span> SUMMER SALE UP TO 50% OFF <span className="animate-pulse">🔥</span>
              </h2>
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Category Slider */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] relative">
        <Swiper
          ref={swiperRef}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + ' bg-pink-500"></span>';
            },
          }}
          navigation
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full h-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {carouselSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full group">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gray-700 bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <h3 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center">
                    {slide.title}
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 text-center">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.link}
                    className="px-4 sm:px-6 py-2 bg-white text-pink-600 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200 hover:bg-pink-50 hover:scale-105 text-sm sm:text-lg md:text-xl"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default Banner 