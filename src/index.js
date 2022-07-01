import './index.scss'

const titles = document.querySelectorAll('.main__title')
const sections = document.querySelectorAll('.main__section')

function handleTitle(e) {
  const el = e.target
  const tabSection = document.querySelector(`.${el.dataset.mainTab}`)
  if (el.classList.contains('active')) return
  titles.forEach(title => title.classList.remove('active'))
  el.classList.add('active')
  sections.forEach(section => section.classList.add('hidden'))
  tabSection.classList.remove('hidden')
}

titles.forEach(title => title.addEventListener('click', handleTitle))

titles[0].click()

//modal

const modalForm = document.querySelector('.modal__form')
function handleForm(e) {
  e.preventDefault()
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData)
  Object.keys(formProps).forEach(key => {
    const names = document.querySelectorAll(`.${key}`)
    names.forEach(name => {
      name.textContent = formProps[key]
    })
  })
  modalForm.classList.add('hidden')
}
modalForm.addEventListener('submit', handleForm)

//sript

let history = ['step__1']

const stepBtns = document.querySelectorAll('.step__btn')
const steps = document.querySelectorAll('.step')
steps.forEach(step => step.classList.add('hidden'))
steps[0].classList.remove('hidden')

function hidePrev(lastStep) {
  if (history.length <= 1) return
  const current = history.indexOf(lastStep)
  if (current === -1) return
  for (let index = current + 1; index < history.length; index++) {
    const el = history[index]
    const next = document.querySelector(`.${el}`)
    next.classList.add('hidden')
    next.querySelectorAll(`input[name=${el}]`).forEach(item => item.checked = false)
  }
  history = history.slice(0, current + 1)
}
function handleBtn(e) {
  const target = e.target
  const nextStep = target.value
  if (!nextStep) return 

  const currentStep = target.name
  hidePrev(currentStep)
  history.push(nextStep)
  
  document.querySelector(`.${nextStep}`).classList.remove('hidden')
}
stepBtns.forEach(btn => {
  btn.addEventListener('change', handleBtn)
})

function handleDate(e) {
  this.type = 'datetime-local'
}
document.querySelector('.re-call__input_date').addEventListener('focus', handleDate)