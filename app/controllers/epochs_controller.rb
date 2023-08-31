class EpochsController < ApplicationController
  def index
    @epochs = Epoch.where(is_open: true).order('epo_num desc').page(params[:page]).per(10)
  end
end
