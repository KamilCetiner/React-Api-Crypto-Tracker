import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from './components/Coin';
import './App.css';
import './Coin.css';


function App() {
  

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    
    useEffect(() => {
  
      
      axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data)
      }).catch(error => console.log(error))
   
    }, []);

    const handleChange = e => {
        setSearch(e.target.value)
       
      }
    
      const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(search.toLowerCase())
    
      )
  
    
    return (
      <div className="coin-app">
              <div className= "coin-search">
          <h1 className= "coin-text" > Search a currency </h1>
  
          <form>
            <input type="text" placeholder="Search"
            className="coin-input" onChange={handleChange} />
          </form>

            
        </div>

        <div className="coin-titlescontainer">
                    <div className="coin-title">
                        <h4>PRICE</h4>
                        <h4>VOLUME</h4>
                        <h4>24 HOUR % CHANGE</h4>
                        <h4>MARKET CAP</h4>

                    </div>
        </div>

        {filteredCoins.map(coin => {
        return(

          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}

          />


        )

      })}
  
      </div>
    );
  }
  
  export default App;
  