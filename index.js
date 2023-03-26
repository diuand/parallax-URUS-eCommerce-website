const box = document.querySelector('.floating-box')
const all_imgs = document.querySelectorAll('.img-box')
const all_text = document.querySelectorAll('.main-content')
const parallaxes = document.querySelectorAll('.parallax')

let Initial_translation = 40
let Initial_rotation = 45


const cumulativeOffset = (element) => {
    var top = 0
    var left = 0
    do {
      top += element.offsetTop || 0 
      left += element.offsetLeft || 0
      element = element.offsetParent
    } while (element)
    return {
      top: top,
      left: left
    }
  }
  



  
const show_elements = (scroll_top,elements,animation) =>{
    elements.forEach((element,i) => {
        const elem_offset = cumulativeOffset(element)
        if (scroll_top + window.innerHeight > elem_offset.top + element.offsetHeight){
            element.classList.add(animation) 
        }
        
    });
}

const calculateRangeValue = (old_min,old_max,new_min,new_max,old_value) =>{
    const oldRange = old_max - old_min
    const newRange = new_max - new_min
    return ((old_value - old_min) * newRange/oldRange) + new_min
}

show_elements(0,all_imgs,'animate')
show_elements(0,all_text,'reveal')

window.addEventListener('scroll',()=>{
    const scroll_top = window.scrollY   
    box.style.transform = `translateY(${Initial_translation+scroll_top/1.3}px) rotate(${Initial_rotation + scroll_top/30}deg)`
    show_elements(scroll_top,all_imgs,'animate')
    show_elements(scroll_top,all_text,'reveal')

    parallaxes.forEach((parallax,i) => {
        if((scroll_top + window.innerHeight/2) > parallax.offsetTop){
            const old_min = (parallax.offsetTop) < (window.innerHeight/2) ? parallax.offsetTop : parallax.offsetTop - window.innerHeight/2
            const old_max = old_min + parallax.offsetHeight
            const y_position = calculateRangeValue(old_min,old_max,0,-200,scroll_top)
            parallax.style.backgroundPosition = `center ${y_position}px`

        }
    });

})


