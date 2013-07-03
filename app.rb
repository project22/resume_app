require 'sinatra'
require 'mongoid'
require 'oj'
require "sinatra/reloader" if development?

Mongoid.load!("mongoid.yml")

class Doc
	include Mongoid::Document

	field :name_first, type: String
	field :name_middle, type: String
	field :name_last, type: String
	field :phone, type: String
	field :email, type: String
	field :linked_in, type: String
	field :website, type: String
	field :twitter, type: String
	# this is a document in the database
	embeds_many :street_address
end

class StreetAddress
	include Mongoid::Document
	#passing around objects.  This is really lame.


end

#shows all the records grabbed by object of Docs
get '/' do 
	
	puts "Gotcha"	#goes to console. not to web page.
	# "Gotcha" would write to the web page.
	# would have to append to final string.
	# return end the block and nothing after that return statement wil be executed.
	content_type :json  #write to the header  Response to the header in HTML

	docs = Doc.all
	
	docs.to_json 
	# only returns the last line in the code by default.
end

#start server like this:  bundle exec rackup -p 3000

#looks for id in the querystring.  The get string.  Finds that record.
get '/:id' do 	
	content_type :json  

	docs = Doc.find params[:id]
	
	docs.to_json 
	
end

# implement POST, PUT, and DELETE
# assign data a sample JSON object
# var data = {"resume":{"name_first":"Bob"}}

# Create
post '/' do
	content_type :json
# Sinatra gives us this JSON object
# request object.  Many properties.  .body   .read get the string.
	data = JSON.parse(request.body.read)["resume"]
	id = Doc.create!(data)._id
	puts "hey"
	x = {:success => true, :message => "Added resume id = #{id}"}.to_json
	#turn is back into jason
	puts x
end


# Update
put '/:id' do
	data = JSON.parse(request.body.read)["resume"]
	doc = Doc.find params[:id]
	doc.update_attributes!(data)
end



# Destroy
delete '/:id' do
	doc = Doc.find params[:id]
	doc.destroy

end







