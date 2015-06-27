class BirthdaysController < ApplicationController
  def index
    render json: Birthday.all.to_json
  end

  def create
    birthday = Birthday.new(birthday_params)
    birthday.save
    render json: birthday.to_json
  end

  def destroy
    birthday = Birthday.find(params[:id])
    birthday.destroy
    head :no_content
  end

  private

  def birthday_params
    params.require(:birthday).permit!
  end
end
