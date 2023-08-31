class AddColumnWinCapacityToContractReceive < ActiveRecord::Migration[7.0]
  def change
    add_column :contract_receives, :win_capacity, :decimal, precision: 30, scale: 0
  end
end
