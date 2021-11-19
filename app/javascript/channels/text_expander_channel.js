import consumer from "./consumer"

consumer.subscriptions.create("TextExpanderChannel", {

  initialized() {
    import("@github/text-expander-element")
  },

  connected() {
    const expander = document.querySelector('text-expander')

    expander.addEventListener('text-expander-change', event => {
      const {key, provide, text} = event.detail

      provide(
        Promise.resolve(
          this.perform("update_suggestions", { text: text })
        ).then(() => {
          const textarea = document.querySelector('textarea')
          const startPos = textarea.selectionStart
          const endPos = textarea.selectionEnd

          const suggestions = document.querySelector('#suggester-list').cloneNode(true)
          suggestions.style = "left: " + startPos + "px; top: " + endPos + "px;"
          suggestions.hidden = false

          return {
            matched: suggestions.childElementCount > 0,
            fragment: suggestions
          }
        })
      )
    })

    expander.addEventListener('text-expander-value', function(event) {
      const {key, item} = event.detail
      if (key === '#') event.detail.value = item.getAttribute('data-value') || item.textContent
    })
  },

  received(data) {
    const suggestions = document.querySelector('#suggester-list')
    suggestions.innerHTML = data.suggestions
  }
})

