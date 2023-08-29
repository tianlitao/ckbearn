class CreateEpoches < ActiveRecord::Migration[7.0]
  def change
    create_table :epoches do |t|
      t.integer :epo_index
      t.integer :epo_length
      t.integer :epo_num
      t.integer :begin_number
      t.integer :end_number
      t.boolean :is_open, default: false
      t.decimal :sum_capacity, precision: 30, scale: 0
      t.decimal :win_capacity, precision: 30, scale: 0
      t.integer :win_address_num
      t.string :win_tx
      t.string :win_number
      t.timestamps
    end
  end
end
