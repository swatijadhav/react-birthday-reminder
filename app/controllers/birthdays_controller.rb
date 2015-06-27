class BirthdaysController < ApplicationController
  def index
    render json: Birthday.all.to_json
  end

  def create
    birthday = Birthday.new(birthday_params)
    birthday.save
    render json: birthday.to_json
  end

  private

  def birthday_params
    params.require(:birthday).permit!
  end
end
