class Api::UsersController < ApplicationController
  before_action :require_logged_out, only: [:create]
  
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to api_user_url(@user)
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: ['User not found'], status: 404
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    @user.buying_power += params[:cost]
    if @user.buying_power >= 0
      @user.save!
      redirect_to api_user_url(@user)
    else
      render json: ['Insufficient funds'], status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
