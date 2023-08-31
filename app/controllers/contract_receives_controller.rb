class ContractReceivesController < ApplicationController
  def index
    @contract_receives = ContractReceive.receives.includes(:epoch).order('block_number desc').page(params[:page]).per(10)
  end
end
