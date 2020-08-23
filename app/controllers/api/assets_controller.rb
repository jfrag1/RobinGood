class Api::AssetsController < ApplicationController
  def show
    @asset = Asset.find(params[:id])
    @asset.update_price!
    render :show
  end
end
