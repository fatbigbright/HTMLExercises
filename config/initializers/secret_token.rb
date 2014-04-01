# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
#HTMLExercises::Application.config.secret_key_base = '0758096854112037e17d83deb36fffe1741c8dad91bbe7fc6a51ab2cc3d3b1f07130aec7f36edfd562230a80bb22436fe1f5d5342d622da4d01b4acae46ff52a'

require 'securerandom'

def secure_token
    token_file = Rails.root.join('.secret')
    if File.exists?(token_file)
        File.read(token_file).chomp
    else
        token = SecureRandom.hex(64)
        File.write(token_file, token)
        token
    end
end
HTMLExercises::Application.config.secret_key_base = secure_token
