class BirthdaysController < ApplicationController
  def index
    render json: Birthday.all.to_json
  end

  def create
    birthday =  if(id = params["birthday"]["id"]).blank?
      Birthday.new
    else
      Birthday.find_by(id: id)
    end
    birthday.update(birthday_params)
    head :no_content
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
