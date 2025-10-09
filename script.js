document.addEventListener('DOMContentLoaded', function() {
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

    searchButton.addEventListener('click', function() {
        const selectedSubject = subjectSelect.value;
        if (selectedSubject) {
            // В будущем здесь будет логика поиска репетиторов
            openModal();
        } else {
            alert('Пожалуйста, выберите предмет');
        }
    });

    // Smooth scroll для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#contacts') {
                openModal();
            } else {
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});