class Api::AssetsController < ApplicationController

  def show
    @asset = Asset.find_by(ticker: params[:id])
    @asset.update_price!
    render :show
  end

  def search
    string = params[:searchbar]
    matched_assets = Asset.where("LOWER(name) LIKE ? OR ticker LIKE ?",
      "%#{string.downcase}%",
      "%#{string.upcase}%"
    )
    @assets = filter_results(matched_assets, string)
    render :search
  end

  private
  def filter_results(matched_assets, string)
    # 1: highest priority - ticker starts with search
    filtered = []
    matched_assets.each do |asset|
      filtered << asset if asset.ticker.start_with?(string.upcase)
    end
    filtered.sort_by! { |asset| asset.ticker.length }

    # 2: name starts with search
    name_starts_with = []
    matched_assets.each do |asset|
      name_starts_with << asset if asset.name.downcase.start_with?(string.downcase)
    end
    filtered += name_starts_with.sort_by { |asset| asset.name.length }

    # 3: a word in the name starts with search
    word_starts_with = []
    word_arrs = matched_assets.map { |asset| asset.name.downcase.split(" ") }
    (1..3).each do |i|
      word_arrs.each_with_index do |word_arr, j|
        if word_arr[i]
          word_starts_with << matched_assets[j] if word_arr[i].start_with?(string.downcase)
        end
      end
    end
    filtered += word_starts_with.uniq
    filtered.uniq!
    
    # don't do more costly operations if not necessary
    return filtered[0..5] if filtered.length >= 6

    # 4: the ticker contains the search
    ticker_contains = []
    matched_assets.each do |asset|
      ticker_contains << asset if asset.ticker.include?(string.upcase)
    end
    filtered += ticker_contains.sort_by { |asset| asset.ticker.length }

    # 5: the name contains the search
    name_contains = []
    matched_assets.each do |asset|
      name_contains << asset if asset.name.downcase.include?(string.downcase)
    end
    filtered += name_contains.sort_by { |asset| asset.name.downcase.index(string.downcase) }

    return filtered.uniq[0..5]
  end
end
