class AddColumnIsWinToContractReceive < ActiveRecord::Migration[7.0]
  def change
    add_column :contract_receives, :is_win, :boolean, :default => false
  end
end
