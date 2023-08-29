require "application_system_test_case"

class ProjectsTest < ApplicationSystemTestCase
  setup do
    @project = projects(:one)
  end

  test "visiting the index" do
    visit projects_url
    assert_selector "h1", text: "Projects"
  end

  test "should create project" do
    visit projects_url
    click_on "New project"

    fill_in "Desc", with: @project.desc
    fill_in "Discord", with: @project.discord
    fill_in "Logo", with: @project.logo
    fill_in "Name", with: @project.name
    fill_in "Nft", with: @project.nft
    fill_in "Twitter", with: @project.twitter
    fill_in "Web", with: @project.web
    click_on "Create Project"

    assert_text "Project was successfully created"
    click_on "Back"
  end

  test "should update Project" do
    visit project_url(@project)
    click_on "Edit this project", match: :first

    fill_in "Desc", with: @project.desc
    fill_in "Discord", with: @project.discord
    fill_in "Logo", with: @project.logo
    fill_in "Name", with: @project.name
    fill_in "Nft", with: @project.nft
    fill_in "Twitter", with: @project.twitter
    fill_in "Web", with: @project.web
    click_on "Update Project"

    assert_text "Project was successfully updated"
    click_on "Back"
  end

  test "should destroy Project" do
    visit project_url(@project)
    click_on "Destroy this project", match: :first

    assert_text "Project was successfully destroyed"
  end
end
