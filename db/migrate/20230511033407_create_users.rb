class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.text :address
      t.text :pub_key
      t.text :attestation
      t.string :key_type
      t.integer :alg
      t.boolean :is_admin
      t.decimal :balance,precision: 20, scale: 8, default: 0

      t.timestamps
    end
  end
end
