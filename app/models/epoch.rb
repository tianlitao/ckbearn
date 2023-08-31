class Epoch < ApplicationRecord
  after_create_commit { broadcast_update_later_to 'epochs', target: 'epoch_tables', partial: "home/epochs" }
end
