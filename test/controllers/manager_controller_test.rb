require 'test_helper'

class ManagerControllerTest < ActionController::TestCase
  test "should get manager_logined" do
    get :manager_logined
    assert_response :success
  end

end
