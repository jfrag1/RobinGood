class Api::AssetsController < ApplicationController
  def show
    @asset = Asset.find(params[:id])
    render :show
  end

  def update
    @asset = Asset.find(params[:id])
    @asset.recent_price = params[:price]
    @asset.save!
    render :show
  end
  # redirect_to api_asset_url(@asset) gives too many redirects error

end
