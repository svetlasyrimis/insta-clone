class PostsController < ApplicationController
  before_action :set_post, only: %i[show update destroy]
  before_action :authorize_request, except: [:show]
  # has_many_attached :picture, service: :s3

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    # @user = User.find(params[:user_id].to_i)
    binding.pry
    # @post.user_id = @current_user.id
    @post = Post.new(post_params.merge(user_id: current_user.id))
    
    if @post.save
      
      # @post.picture.attach(params[:images])
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # def add_picture 
  #   byebug
  #   @post = post.find(params[:id])
  #   @post.pictures.attach(params[:pictures])
  #   # @post.update_attributes(params[:pictures])
  #   render json: {post: @post}  
  # end
  
  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  

  
  # DELETE /posts/1
  def destroy    
    @post.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # def update_post_params
  #   params.require(:post).permit(:postname, :email, :picture)
  # end

  # Only allow a trusted parameter "white list" through.
  def post_params
    
    params.permit(:name, :picture)
  end
end
