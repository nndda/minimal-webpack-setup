let seconds = 0

setInterval(() => {
  seconds++
  document.querySelector("h2").textContent = `
    ${seconds} seconds has passed...
  `
}, 1000)
