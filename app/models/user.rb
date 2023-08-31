class User < ApplicationRecord
  FROM = {0 => 'joyid', 1 => 'CKBull'}

  def is_joyid?
    self.from == 0
  end

  def is_ckbull?
    self.from == 1
  end

end
