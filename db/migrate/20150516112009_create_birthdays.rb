class CreateBirthdays < ActiveRecord::Migration
  def change
    create_table :birthdays do |t|
      t.string :name
      t.date :birthdate
      t.integer :reminder_day
      t.float :reminder_time
      t.string :email
      t.string :phone

      t.timestamps null: false
    end
  end
end
