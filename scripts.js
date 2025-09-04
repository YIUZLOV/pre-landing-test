const formElement = document.querySelector('.contact__form')
const inputElement = document.querySelector('.contact__form__input')
const submitFormButtonElement = document.querySelector('.contact__form__submit')
const successMessageElement = document.querySelector('.contact__success-message')
const countdownElement = document.querySelector('.contact__timing__countdown')
const progressBar = document.querySelector('.progress-bar');

function addZero(num) {
    return num < 10 ? '0' + num : num
}

function startCountdown() {
    const now = new Date()
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0)
    let totalMilliseconds = midnight - now
    let totalSeconds = Math.floor(totalMilliseconds / 1000)
    const maxSeconds = 24 * 60 * 60

    const interval = setInterval(() => {
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60

        const progress = (1 - (totalSeconds / maxSeconds)) * 100

        progressBar.style.width = `${progress}%`

        const formattedTime = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`
        
        countdownElement.textContent = formattedTime

        totalSeconds--

        if (totalSeconds < 0) {
            clearInterval(interval)
            countdownElement.textContent = '00:00:00'
            progressBar.style.width = '100%'
        }
    }, 1000)
}

function stopAnimatedInput() {
  if (inputElement.value.trim() === '') {
        inputElement.classList.remove('paused')
    } else {
        inputElement.classList.add('paused')
    } 
}

inputElement.addEventListener('input', stopAnimatedInput)

window.addEventListener('DOMContentLoaded', () => {
    startCountdown()
    stopAnimatedInput()
})

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  formElement.classList.toggle('visually-hidden')
  successMessageElement.classList.toggle('visually-hidden')
})
