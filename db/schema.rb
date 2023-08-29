# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_08_29_013727) do
  create_table "contract_receives", charset: "utf8", force: :cascade do |t|
    t.string "address"
    t.integer "block_number"
    t.integer "exp_id"
    t.decimal "capacity", precision: 30
    t.string "cell_type"
    t.string "status"
    t.string "transaction_hash"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "epoch_id"
    t.boolean "is_use", default: false
    t.index ["epoch_id"], name: "index_contract_receives_on_epoch_id"
  end

  create_table "epoches", charset: "utf8", force: :cascade do |t|
    t.integer "epo_index"
    t.integer "epo_length"
    t.integer "epo_num"
    t.integer "begin_number"
    t.integer "end_number"
    t.boolean "is_open", default: false
    t.decimal "sum_capacity", precision: 30
    t.decimal "win_capacity", precision: 30
    t.integer "win_address_num"
    t.string "win_tx"
    t.string "win_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "settings", charset: "utf8", force: :cascade do |t|
    t.string "var", null: false
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["var"], name: "index_settings_on_var", unique: true
  end

  create_table "sign_in_tokens", charset: "utf8", force: :cascade do |t|
    t.integer "user_id"
    t.string "token"
    t.datetime "expired_at"
    t.datetime "create_time"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8", force: :cascade do |t|
    t.string "name"
    t.text "address"
    t.text "pub_key"
    t.text "attestation"
    t.string "key_type"
    t.integer "alg"
    t.boolean "is_admin"
    t.decimal "balance", precision: 20, scale: 8, default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "chain"
  end

end
