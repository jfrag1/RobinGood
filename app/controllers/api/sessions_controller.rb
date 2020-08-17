class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]
  before_action :require_logged_out, only: [:create]
  skip_before_action :verify_authenticity_token

  
  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login!(@user)
      redirect_to api_user_url(@user)
    else
      render json: ["Invalid username/password combination"], status: 404
    end
  end

  def destroy
    logout!
    render json: {}
  end

end
