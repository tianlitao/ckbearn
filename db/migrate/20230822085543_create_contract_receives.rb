class CreateContractReceives < ActiveRecord::Migration[7.0]
  def change
    create_table :contract_receives do |t|
      t.string :address
      t.integer :block_number
      t.integer :exp_id
      t.decimal :capacity, precision: 30, scale: 0
      t.string :cell_type
      t.string :status
      t.string :transaction_hash
      t.timestamps
    end
  end
end
