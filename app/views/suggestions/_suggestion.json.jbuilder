json.extract! suggestion, :id, :title, :body, :created_at, :updated_at
json.url suggestion_url(suggestion, format: :json)
