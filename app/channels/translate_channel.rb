class TranslateChannel < ApplicationCable::Channel
  include Lookup

  def subscribed
    @dict = initialize_lookup_hash
    stream_from "translation_stream"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def respond(data)
    ActionCable.server.broadcast(
      'translation_stream', message: translate( data['message'] )
    )
  end

  private

    def translate(char)
      @dict[char.downcase.to_sym] || ""
    end
end
