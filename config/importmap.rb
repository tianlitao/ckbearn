# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "flowbite", to: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.turbo.min.js"
pin "joyid", to: "https://unpkg.com/@joyid/joyid.js"
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "jquery", to: "https://ga.jspm.io/npm:jquery@3.7.0/dist/jquery.js"
pin "jquery.cookie", to: "https://ga.jspm.io/npm:jquery.cookie@1.4.1/jquery.cookie.js"
pin "wallet-sdk-js", to: "node_modules/wallet-sdk-js/lodash.js", preload: true