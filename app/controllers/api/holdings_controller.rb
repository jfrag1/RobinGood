class Api::HoldingsController < ApplicationController
  def create
    @holding = Holding.new(holding_params)
    if @holding.save
      render :show
    else
      render json: @holding.errors.full_messages, status: 422
    end
  end

  def update
    @holding = Holding.find(params[:id])
    initial_quant = @holding.quantity
    @holding.quantity = params[:quantity]
    if @holding.save
      render :show
    else
      render json: ["You only have #{initial_quant} shares to sell"], status: 422
    end
  end

  def destroy
    @holding = Holding.find(params[:id])
    @holding.destroy
    render :show
  end

  

  private
  def holding_params
    params.require(:holding).permit(:user_id, :asset_id, :quantity)
  end
end
