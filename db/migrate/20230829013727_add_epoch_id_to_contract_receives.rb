class AddEpochIdToContractReceives < ActiveRecord::Migration[7.0]
  def change
    add_column :contract_receives, :epoch_id, :integer
    add_index :contract_receives, :epoch_id
    add_column :contract_receives, :is_use, :boolean, default: false
  end
end
