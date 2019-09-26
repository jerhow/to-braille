Rails.application.routes.draw do
  root to: "pages#home"
  resources :translate, only: [:index]
end
