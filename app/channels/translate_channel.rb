class TranslateChannel < ApplicationCable::Channel
  def subscribed
    stream_from "translation_stream"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def respond(data)
    ActionCable.server.broadcast(
      'translation_stream', message: data['message'].upcase
    )
  end
end
