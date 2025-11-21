
window.addEventListener("DOMContentLoaded", () => {

  let seconds = 0
  const timeEl = document.querySelector("#time-passed")

  setInterval(() => {
    seconds++
    timeEl.textContent = `${seconds} seconds has passed...`
  }, 1000)

})
