// Function to create the lightbox items
export function createLightboxItems(item) {
  const li = document.createElement('li')
  li.classList.add('glide__slide', 'item__' + item.order)

  const img = document.createElement('img')
  img.classList.add('glide__image')
  img.src = item.image
  img.alt = item.alt

  li.append(img)

  if (item.caption !== '') {
    const figcaption = document.createElement('figcaption')
    figcaption.classList.add('glide__caption')
    figcaption.innerText = item.caption

    li.append(figcaption)
  }

  return li
}

// Function to create the lightbox nav items
export function createLightboxNavItems(item) {
  const li = document.createElement('div')
  li.classList.add('grid__item', 'item__' + item.order)
  li.setAttribute('data-status', item.status)
  li.setAttribute('data-order', item.order)
  if (item.status == 'current') {
    li.classList.add('item--current')
  }

  const button = document.createElement('button')
  button.classList.add('grid__button')
  button.setAttribute('type', 'button')

  li.append(button)

  const img = document.createElement('img')
  img.classList.add('grid__image')
  img.src = item.image
  img.alt = item.alt

  button.append(img)

  return li
}
