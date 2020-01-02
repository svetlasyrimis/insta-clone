class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :picture

  def picture
    object.picture.service_url if object.picture.attached?
  end
end
