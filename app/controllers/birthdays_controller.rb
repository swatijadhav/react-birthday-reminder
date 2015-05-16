class BirthdaysController < ApplicationController
  def index
    render json: Birthday.all.to_json
  end
end
