class TextExpanderChannel < ApplicationCable::Channel

  def subscribed
    stream_for "all"
  end

  def update_suggestions(data)
    text = data["text"] || ""
    suggestions = Suggestion.where("title LIKE ?", "%#{text}%")

    if suggestions.any?
      broadcast_to("all",
        suggestions: ApplicationController.new.render_to_string(
          partial: 'suggestions/suggester',
          locals: {
            suggestions: suggestions
          }
        )
      )
    end
  end

end
