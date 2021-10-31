// Function to create the lightbox items
export function createLightboxItems(item) {
  const li = document.createElement('li')
  li.classList.add('lightbox__item', 'item__' + item.order)
  li.setAttribute('data-status', item.status)
  li.setAttribute('data-order', item.order)
  if (item.status == 'current') {
    li.classList.add('item__current')
  }

  const img = document.createElement('img')
  img.classList.add('lightbox__image')
  img.src = item.image
  img.alt = item.alt

  li.append(img)

  if (item.caption !== '') {
    const figcaption = document.createElement('figcaption')
    figcaption.classList.add('lightbox__caption')
    figcaption.innerText = item.caption

    li.append(figcaption)
  }

  return li
}
