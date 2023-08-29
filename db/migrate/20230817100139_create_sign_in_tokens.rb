class CreateSignInTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :sign_in_tokens do |t|
      t.integer :user_id
      t.string :token
      t.datetime :expired_at
      t.datetime :create_time
      t.string :status
      t.timestamps
    end
    add_column :users, :chain, :string
  end
end
