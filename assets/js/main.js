// MOBILE MENU

const mobMenuShow = () => {
    document.querySelector('.mobile-menu-block').classList.add('open');
    document.querySelector('.mobile-menu-burger').style.display = 'none';
    document.querySelector('.mobile-menu-close').style.display = 'block';
    document.querySelector('body').classList.add('blocked');
}

const mobMenuHide = () => {
    if (document.querySelector('.mobile-menu-close').style.display == 'block') {
        document.querySelector('.mobile-menu-block').classList.remove('open');
        document.querySelector('.mobile-menu-close').style.display = 'none';
        document.querySelector('.mobile-menu-burger').style.display = 'block';
        document.querySelector('body').classList.remove('blocked');
    } 
}

const navItems = document.querySelectorAll('.nav-list-item');
for (var i = 0; i < navItems.length; i++) {
    navItems[i].onclick = mobMenuHide;
}

document.addEventListener('mousedown', function(e){
    if(e.target.closest('.mobile-menu') === null){
        mobMenuHide();
    }
});

// TESTIMONIALS CAROUSEL

let position = 0;
let SlidesToShow = 3;
let SlidesToScroll = 1;
const container = document.querySelector('.container');
const track = document.querySelector('.testimonials-track');
const btnPrev = document.querySelector('.testimonials-prev-button');
const btnNext = document.querySelector('.testimonials-next-button');
const items = document.querySelectorAll('.testimonials-card');
const itemsCount = items.length;

if (window.innerWidth <= 1024) {
    SlidesToShow = 2;
};

if (window.innerWidth <= 600) {
    SlidesToShow = 1;
};

const itemWidth = container.clientWidth / SlidesToShow;
const movePosition = SlidesToScroll * (itemWidth);

items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
});

btnNext.addEventListener('click', () => {
    const itemsLeft = itemsCount - (Math.abs(position) + SlidesToShow * itemWidth) / itemWidth;
    position -= itemsLeft >= SlidesToScroll ? movePosition : itemsLeft * itemWidth;
    setPosition();
    checkBtns();
});

btnPrev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;
    position += itemsLeft >= SlidesToScroll ? movePosition : itemsLeft * itemWidth;
    setPosition();
    checkBtns();
});

const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
}

const checkBtns = () => {
    btnPrev.disabled = position === 0;
    if (btnPrev.disabled) {
        btnPrev.classList.add('disabled')
    } else {btnPrev.classList.remove('disabled')};
    btnNext.disabled = position <= -(itemsCount - SlidesToShow) * itemWidth;
    if (btnNext.disabled) {
        btnNext.classList.add('disabled')
    } else {btnNext.classList.remove('disabled')};
}

checkBtns();

// SCROLL TO
const scrollToTop = () => {
    document.getElementById("top").scrollIntoView({behavior: 'smooth'});
}
const scrollToForm = () => {
    document.getElementById("contact-form").scrollIntoView({behavior: 'smooth'});
}
const scrollToAbout = () => {
    document.getElementById("about-section").scrollIntoView({behavior: 'smooth'});
}
const scrollToServices = () => {
    document.getElementById("services").scrollIntoView({behavior: 'smooth'});
}
const scrollToTestimonials = () => {
    document.getElementById("testimonials").scrollIntoView({behavior: 'smooth'});
}
const scrollToContact = () => {
    document.getElementById("contact").scrollIntoView({behavior: 'smooth'});
}

// NAV-ITEM ACTIVE
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.nav-list-item').forEach((link) => {
                link.classList.toggle('active', link.getAttribute('data-scroll') === entry.target.id);
            });
        }
    });
}, {
    threshold: 0.7
});

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// TESTIMONIAL POPUP
const testimonialPopupShow = () => {
    document.querySelector('.testimonial-popup').classList.add('active');
    document.querySelector('.wrapper').classList.add('blured');
    document.querySelector('body').classList.add('blocked');
}
document.addEventListener('mousedown', function(e){
    if (document.querySelector('.testimonial-popup').classList.contains('active')) {
        if(e.target.closest('.testimonial-screenshot') === null){
            document.querySelector('.testimonial-popup').classList.remove('active');
            document.querySelector('.wrapper').classList.remove('blured');
            document.querySelector('body').classList.remove('blocked');
        }
    }
});

// SUBSCRIBE POPUP
const subscrPopupShow = () => {
    document.querySelector('.subscribe-popup').classList.add('active');
    document.querySelector('.wrapper').classList.add('blured');
    document.querySelector('body').classList.add('blocked');
}
document.addEventListener('mousedown', function(e){
    if (document.querySelector('.subscribe-popup').classList.contains('active')) {
        if(e.target.closest('.form-wrapper') === null){
            document.querySelector('.subscribe-popup').classList.remove('active');
            document.querySelector('.wrapper').classList.remove('blured');
            document.querySelector('body').classList.remove('blocked');
        }
    }
});

// CURRENT YEAR
document.querySelector('.current-year').innerHTML = new Date().getFullYear();

// FORM CUSTOM

const form = document.querySelector('#contact-form');
form.addEventListener('submit', formSend);

async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
        form.classList.add('sending');
        let response = await fetch('send.php', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            form.classList.remove('sending');
        } else {
            alert('Произошла ошибка, попробуйте позже');
            form.classList.remove('sending');
        }
    } else {
        alert('Заполните необходимые поля');
    }
}

function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.required');

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);

        if(input.classList.contains('email-input')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
            formAddError(input);
                error++;
        } else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }
}

function formAddError(input) {
    input.parentElement.classList.add('error');
    input.classList.add('error');
}

function formRemoveError(input) {
    input.parentElement.classList.remove('error');
    input.classList.remove('error');
}

// email testing function
function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w{2,8})+$/.test(input.value);
}


