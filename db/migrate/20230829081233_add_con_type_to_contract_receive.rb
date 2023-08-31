class AddConTypeToContractReceive < ActiveRecord::Migration[7.0]
  def change
    add_column :contract_receives, :con_type, :boolean, default: true
  end
end
