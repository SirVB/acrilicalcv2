const config = {
  ACRILICO_ANCHO:   1220,
  ACRILICO_ALTO:    1840,
  ACRILICO_PRECIO:  44000,
  ACRILICO_MANOBRA: 30,
  ACRILICO_GROSOR: 3,
  BISAGRAS_PRECIO:  750,
  THEME:           'light'
}

const configInputs = {
  width: document.querySelector('#config-width'),
  height: document.querySelector('#config-height'),
  price: document.querySelector('#config-price'),
  thick: document.querySelector('#config-thick'),
  hinge: document.querySelector('#config-hinge'),
  labor: document.querySelector('#config-labor'),
  theme: document.querySelector('#config-theme')
}

const propertiesInputs = {
  product: document.querySelector('#product'),
  width: document.querySelector('#properties-width'),
  height: document.querySelector('#properties-height'),
  depth: document.querySelector('#properties-depth'),
  hinge: document.querySelector('#properties-hinge'),
  quantity: document.querySelector('#properties-quantity'),
  horizontal: document.querySelector('#properties-horizontal'),
  vertical: document.querySelector('#properties-vertical')
}

const calcButton = document.querySelector('#calculate')
const resetButton = document.querySelector('#reset')
const result = document.querySelector('#results')

propertiesInputs.product.addEventListener('change', (e) => {
  if (e.target.value === '2') {
    propertiesInputs.depth.parentNode.style.display = 'none'
    propertiesInputs.quantity.parentNode.style.display = 'flex'
    propertiesInputs.horizontal.parentNode.parentNode.style.display = 'none'
    propertiesInputs.vertical.parentNode.parentNode.style.display = 'none'
  } else {
    propertiesInputs.depth.parentNode.style.display = 'flex'
    propertiesInputs.quantity.parentNode.style.display = 'none'
    propertiesInputs.horizontal.parentNode.parentNode.style.display = 'flex'
    propertiesInputs.vertical.parentNode.parentNode.style.display= 'flex'
  }
})

configInputs.thick.addEventListener('change', (e) => {
  if (e.target.value === '4') {
    configInputs.price.value = 59000
  } else {

  }
})

configInputs.theme.addEventListener('click', (e) => {
  const doc = document.documentElement
  e.target.innerHTML = ''
  if (config.THEME === 'light') {
    config.THEME = 'dark'
    doc.style.setProperty('--background-color', '#0d1117')
    doc.style.setProperty('--primary-color', '#0d6efd')
    doc.style.setProperty('--text-color', 'rgb(132, 141, 151)')
    doc.style.setProperty('--border-color', '#30363d')
    doc.style.setProperty('--secondary-color', '#0d1117')
    e.target.innerHTML = '<i class="fa-solid fa-sun"></i>'
  }
  else {
    config.THEME = 'light'
    doc.style.setProperty('--background-color', '#ffffff')
    doc.style.setProperty('--primary-color', '#007bff')
    doc.style.setProperty('--text-color', '#333333')
    doc.style.setProperty('--border-color', '#d1d1d1')
    doc.style.setProperty('--secondary-color', '#f8f9fa')
    e.target.innerHTML = '<i class="fa-solid fa-moon"></i>'
  }
})

function calculateSinglePiece(width, height, quantity = false) {
  const a = height / configInputs.width.value
  const b = width / configInputs.height.value
  const c = a * b
  const d = c * configInputs.price.value * 2
  return (quantity) ? d * propertiesInputs.quantity.value : d
}

function calculateBox(width, height, depth) {
  const a = calculateSinglePiece(width, height)
  const b = calculateSinglePiece(width, depth)
  const c = calculateSinglePiece(height, depth)
  const d = a + b + c
  return d * 2
}

function addLabor(price) {
  const a = price * (1 + (configInputs.labor.value / 100))
  return a
}

resetButton.addEventListener('click', () => {
  const inputs = document.querySelectorAll('input')
  const select = document.querySelectorAll('select')
  select.forEach((select) => {
    select.value = '1'
    select.animate([
      { transform: 'scaleY(1)' },
      { transform: 'scaleY(1.2)' },
      { transform: 'scaleY(1)' }
    ], {
      duration: 200,
      iterations: 1
    })
  })
  inputs.forEach((input) => {
    if (input.parentNode.parentNode.parentNode.parentNode.id === 'config') return
    input.value = ''
    input.animate([
      { transform: 'scaleY(1)' },
      { transform: 'scaleY(1.2)' },
      { transform: 'scaleY(1)' }
    ], {
      duration: 200,
      iterations: 1
    })
  })
  result.innerHTML = ''
})

calcButton.addEventListener('click', () => {
  if (propertiesInputs.product.value === '1') {
    const a = calculateBox(propertiesInputs.width.value, propertiesInputs.height.value, propertiesInputs.depth.value)
    const b = configInputs.hinge.value * propertiesInputs.hinge.value
    const horizontal = calculateSinglePiece(propertiesInputs.height.value, propertiesInputs.depth.value) * propertiesInputs.horizontal.value
    const vertical = calculateSinglePiece(propertiesInputs.width.value, propertiesInputs.depth.value) * propertiesInputs.vertical.value
    const c = a + b + horizontal + vertical
    result.innerHTML = ''
    result.innerHTML = `
    <details>
    <summary>Detalles</summary>
    <span class="info"> = ${a.toFixed(2)} (Caja)</span>
    <span class="info"> + ${b.toFixed(2)} (${propertiesInputs.hinge.value} Bisagra(s))</span>
    <span class="info"> + ${horizontal.toFixed(2)}  (${propertiesInputs.horizontal.value} Div. Hor.)</span>
    <span class="info"> + ${vertical.toFixed(2)}  (${propertiesInputs.vertical.value} Div. Vert.)</span>
    <span class="info"> = ${c.toFixed(2)}</span>
    <span class="info"> + ${configInputs.labor.value}% (Obra)</span>
    </details>
    <h3>Total</h3>
    <span class="info total"> ${addLabor(c).toLocaleString("es-CL", { style: "currency", currency: "CLP"})}</span>
    `
  } else {
    const a = calculateSinglePiece(propertiesInputs.width.value, propertiesInputs.height.value, true)
    const b = a + (configInputs.hinge.value * propertiesInputs.hinge.value)
    result.innerHTML = ''
    result.innerHTML = `<span class="info"> = ${addLabor(b).toLocaleString("es-CL", { style: "currency", currency: "CLP"})}</span>`
  }
})
