# frozen_string_literal: true

class UserStatus < ActiveRecord::Base
  include CacheMarkdownField

  belongs_to :user

  validates :user, presence: true
  validates :emoji, inclusion: { in: Gitlab::Emoji.emojis_names }
  validates :message, length: { maximum: 100 }, allow_blank: true

  cache_markdown_field :message, pipeline: :emoji
end
