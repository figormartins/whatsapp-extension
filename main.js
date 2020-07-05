const captureValue = () => {
  const speed = parseFloat(document.querySelector('.selected').getAttribute('value'))
  changeSpeed(speed)
}

const changeSpeed = (speed) => {
  const audios = document.querySelectorAll('audio')
  audios.forEach((audio) => {
    audio.playbackRate = speed
  })
}

const removeClassActive = ({ path }) => {
  const firstPath = path[0]

  if (typeof firstPath.classList === 'undefined')
    return
  
  if (!firstPath.classList.contains('selected')) {
    const optionsContainerItem = document.querySelector(".options-container")
    optionsContainerItem.classList.remove('active')
  }
}

const createOption = (index) => {
  const name = `option${index}`

  const classOption = document.createElement('div')
  classOption.classList.add('option')

  const option = document.createElement('input')
  option.setAttribute('id', name)
  option.setAttribute('value', index)
  option.setAttribute('type', 'radio')
  option.setAttribute('name', 'option')
  option.classList.add('radio')

  const label = document.createElement('label')
  label.setAttribute('for', name)
  label.innerHTML = `${index.toFixed(2)}x`

  classOption.appendChild(option)
  classOption.appendChild(label)

  return classOption
}

const interval = setInterval(() => {

  const header = document.querySelector('header')

  if (header) {
    clearInterval(interval)

    const selectBox = document.createElement('div')
    selectBox.classList.add('select-box')

    const optionsContainer = document.createElement("div")
    optionsContainer.classList.add('options-container')

    for (let i = 1.0; i <= 2; i += 0.25) {
      const option = createOption(i)
      optionsContainer.appendChild(option)
    }

    const selected = document.createElement('div')
    selected.classList.add('selected')
    selected.innerHTML = '1.00x'
    selected.setAttribute('value', 1)

    selectBox.appendChild(optionsContainer)
    selectBox.appendChild(selected)
    header.appendChild(selectBox)

    const selectedItem = document.querySelector(".selected")
    const optionsContainerItem = document.querySelector(".options-container")
    const optionsList = document.querySelectorAll(".option")

    selectedItem.addEventListener("click", () => {
      optionsContainerItem.classList.toggle("active")
    })

    optionsList.forEach(option => {
      option.addEventListener("click", () => {
        selectedItem.innerHTML = option.querySelector("label").innerHTML
        selectedItem.setAttribute('value', option.querySelector("input").value)
        optionsContainerItem.classList.remove("active")
      })
    })
  }
}, 500);

document.addEventListener('click', (e) => {
  captureValue()
  removeClassActive(e)
})