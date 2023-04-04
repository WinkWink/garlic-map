import React, { Component } from 'react'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, SearchBox } from 'react-instantsearch-dom'
import { GoogleMapsLoader } from 'react-instantsearch-dom-maps'
import Stats from './Stats'
import Content from './Content'
import Geo from './Geo'
import './App.css'

const searchClient = algoliasearch(
  '7WDHTSNYJ6',
  '97181a63bd77c42949788ac3f66a1d15'
);

class App extends Component {
  render() {
    return (
      <InstantSearch
        indexName="the-black-garlic-company"
        searchClient={searchClient}
      >
        <Configure
          hitsPerPage={200}
          getRankingInfo
          aroundLatLngViaIP
          typoTolerance="min"
        />
        <main className="search-container">
          <div className="right-panel">
            <div id="map">
              {/* Uncomment the following widget to add a map */}
              <div style={{ height: '100%' }}>
                <GoogleMapsLoader apiKey="AIzaSyBawL8VbstJDdU5397SUX7pEt9DslAwWgQ">
                  {google => <Geo google={google} />}
                </GoogleMapsLoader>
              </div>
            </div>
            
            <div id="searchbox">
              {/* Uncomment the following widget to add a search bar */}
              <SearchBox
                translations={{
                  placeholder: 'Search stores by name, city, address'
                }}
              />
            </div>
            <div id="stats">
              {/* Uncomment the following widget to add search stats */}
              <Stats />
            </div>
          </div>
          <div className="left-panel">
            <div id="hits">
              {/* Uncomment the following widget to add hits list */}
              <Content />
            </div>
          </div>
        </main>
      </InstantSearch>
    )
  }
}

export default App
