# RobinGood

## https://robin-good.herokuapp.com/

RobinGood is a clone of the popular stock trading app [Robinhood.](https://robinhood.com/) Users can simulate the buying and selling of stocks, place and remove stocks on their watchlist, and navigate to stocks' detail pages using a search bar.

### Technologies used

In this project, Ruby on Rails acts as a backend API, and React handles handles the views. Redux is used to manage the application state. All of the React and Redux code is contained within the `frontend/` folder. The Recharts library takes care of constructing graphs, and the IEX Cloud API is used to retrieve real-time stock market data.

### Versions:

* Ruby: `2.7.1`
* Rails: `5.2.3`
* React: `16.13.1`
* Redux: `4.0.5`
* Recharts: `1.8.5`

### Configuration

1. run `npm install`
2. run `bundle install`
3. run `bundle exec rails db:setup`
4. Sign up for a free API key from [IEX Cloud](https://iexcloud.io/) to retrieve stock and news data.
5. run `bundle exec rails credentials:edit` This will open a file. Add the following to the file, then save and close it:<br/>
`cloudIEX:`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;`api_key: {Your key here}`
6. run `npm start` This starts webpack in development mode.
  
  
Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
