document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Закрытие мобильного меню при клике на ссылку
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие мобильного меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Модальное окно
    const modal = document.getElementById('contactModal');
    const contactButtons = document.querySelectorAll('.contact-btn, .tutor-contact');
    const closeModal = document.querySelector('.close-modal');

    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunc() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    contactButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    closeModal.addEventListener('click', closeModalFunc);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    });

    // Search functionality
    const searchButton = document.querySelector('.search-button');
    const subjectSelect = document.querySelector('.subject-select');

    if (searchButton && subjectSelect) {
        searchButton.addEventListener('click', function() {
            const selectedSubject = subjectSelect.value;
            if (selectedSubject) {
                // В будущем здесь будет логика поиска репетиторов
                openModal();
            } else {
                alert('Пожалуйста, выберите предмет');
            }
        });
    }

    // Smooth scroll для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#contacts') {
                openModal();
            } else {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками
    document.querySelectorAll('.subject-card, .tutor-card, .advantage-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});