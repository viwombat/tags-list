let tags = []

let button = document.querySelector('button')
let input = document.querySelector('input')
let container = document.querySelector('.container-for-tags')
let checkbox = document.querySelector('input[type=checkbox]')

input.onfocus = () => {
  input.value = ''
}

function createDiv () {
  if (input.value) {
    let div = document.createElement('div')
    div.className = "tag"
    container.append(div)

    let remove = document.createElement('button')
    remove.className = "remove"
    remove.innerHTML = "×"
    remove.onclick = removeDiv

    let innerDiv = document.createElement('div')
    innerDiv.className = "inner-tag"
    innerDiv.innerHTML = input.value

    tags.push(input.value) 
    localStorage.setItem(input.value, new Date())
    input.value = ""
  
    container.lastChild.append(innerDiv)
    container.lastChild.append(remove)
    input.value = 'Add a tag'
  }
}

function removeDiv () {
  let index = tags.indexOf(this.previousSibling.innerHTML)
  tags.splice(index, 1)

  localStorage.clear(this.previousSibling.innerHTML)

  this.parentNode.remove()
}

document.addEventListener('change', function () {
  let check = event.target
  let remove = document.querySelectorAll('.remove')

  if (check.type === 'checkbox' && check.checked){
    remove.forEach( btn => {
      btn.onclick = (event) => {
        event.preventDefault()
      }
    })

    document.querySelector('.add').onclick = (event) => {
      event.preventDefault()
    }
  } else {
    remove.forEach( btn => { btn.onclick = removeDiv })
    document.querySelector('.add').onclick = createDiv
  }
})
