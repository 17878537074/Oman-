// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 商品筛选功能
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 移除所有按钮的active类
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // 给当前点击的按钮添加active类
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        galleryItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// 图片放大功能
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');

galleryItems.forEach(item => {
    const img = item.querySelector('img');
    img.addEventListener('click', () => {
        modal.classList.add('show');
        modalImg.src = img.src;
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// 导航栏滚动处理
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
let isScrolling = false;
let scrollTimeout = null;

// 移动端触摸事件处理
let touchStartY = 0;
let touchTimeout = null;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (isScrolling) return;

    const touchY = e.touches[0].clientY;
    const scrollDirection = touchStartY > touchY ? 'down' : 'up';

    if (scrollDirection === 'down' && window.scrollY > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    touchStartY = touchY;

    // 清除之前的定时器
    clearTimeout(touchTimeout);
    // 设置新的定时器，300ms后显示导航栏
    touchTimeout = setTimeout(() => {
        navbar.classList.remove('hidden');
    }, 300);
});

// 桌面端滚动事件处理
window.addEventListener('scroll', () => {
    if (isScrolling) return;

    isScrolling = true;
    window.requestAnimationFrame(() => {
        const currentScrollTop = window.scrollY;

        if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScrollTop = currentScrollTop;
        isScrolling = false;

        // 清除之前的定时器
        clearTimeout(scrollTimeout);
        // 设置新的定时器，300ms后显示导航栏
        scrollTimeout = setTimeout(() => {
            navbar.classList.remove('hidden');
        }, 300);
    });
});