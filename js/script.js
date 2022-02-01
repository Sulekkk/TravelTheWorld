const burger = document.querySelector('.hamburger')
const menu = document.querySelector('.mobile__items')
const counters = document.querySelectorAll('.counter')
const counterSection = document.querySelector('.counters')
const slides = document.querySelectorAll('.slide')
const leftBtn = document.getElementById('left')
const rightBtn  = document.getElementById('right')
const carouselBg = document.querySelector('.carousel')
const menuItems = document.querySelectorAll('.item')
const buttons = document.querySelectorAll('.ripple')

const handleBurger = () =>{
    burger.classList.toggle('is-active')
    menu.classList.toggle('active')
    document.body.classList.toggle('stop-scroll')
    
    menuItems.forEach(menuItem=>{
        menuItem.addEventListener('click', ()=>{
            document.body.classList.remove('stop-scroll')
            burger.classList.remove('is-active')
            menu.classList.remove('active')
        })
    })
}

counters.forEach(counter =>{
    counter.innerText= '0'

    const updateCounter = () =>{
        const target = +counter.getAttribute('data-target')
        const c = +counter.innerText

        const increment = target / 300

        if(c < target){
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter,1)
        }else{
            counter.innerText = target
        }
    }
    
    const counterTop = counterSection.getBoundingClientRect().top

    const startCounting = ()=>{
        if (counterTop < window.scrollY) {
            updateCounter()
        }
    }
    window.addEventListener('scroll', startCounting)
})


let activeSlide = 0

const changeRight = ()=>{
    activeSlide++
    if(activeSlide > slides.length -1){
        activeSlide = 0
    }
    setBgToBody()
    setActiveSlide()
}
const changeLeft = ()=>{
    activeSlide-- 
    if(activeSlide < 0){
        activeSlide = slides.length +1
    }
    setBgToBody()
    setActiveSlide()
}

const setBgToBody = ()=>{
    carouselBg.style.backgroundImage = slides[activeSlide].style.backgroundImage
}
setBgToBody()

const setActiveSlide = ()=>{
    slides.forEach(slide => slide.classList.remove('active'))
    slides[activeSlide].classList.add('active')
}

buttons.forEach(button => {
    button.addEventListener('click', (e) =>{
        const x = e.clientX
        const y = e.clientY
        
        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        button.append(circle)

        setTimeout(()=> circle.remove(), 500)
    })
})

rightBtn.addEventListener('click', changeRight)
leftBtn.addEventListener('click', changeLeft)
burger.addEventListener('click', handleBurger)