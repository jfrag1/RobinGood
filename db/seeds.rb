# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Holding.destroy_all
User.destroy_all
Asset.destroy_all


Asset.create({ name: 'Apple', ticker: 'AAPL' })
Asset.create({ name: 'Amazon', ticker: 'AMZN' })
Asset.create({ name: 'Twitter', ticker: 'TWTR' })
Asset.create({ name: 'Facebook', ticker: 'FB' })

User.create({ username: "Guest", password: "showmethemoney" })
User.create({ username: "Jack", password: "jfjfjf" })
User.create({ username: "Tammy", password: "jfjfjf" })
User.create({ username: "Luke", password: "jfjfjf" })