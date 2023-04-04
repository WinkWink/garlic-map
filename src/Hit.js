import React from 'react'
import PropTypes from 'prop-types'
import { Highlight } from 'react-instantsearch-dom'

const Hit = ({ hit }) => (
  <div className="hit">
    <h2 className="hit-name">
      <span className="hit-airport-name">
        <Highlight attribute="name" hit={hit} />{' '}
    
      </span>
    </h2>
    <p className="hit-location">
      <Highlight attribute="address" hit={hit} /> <br /> 
      <span className="hit-distance">
        {hit._rankingInfo &&
          hit._rankingInfo.matchedGeoLocation && (
            <span>
              {parseInt(
                (hit._rankingInfo.matchedGeoLocation.distance / 1000) * .62,
                10
              ) + " "}
              miles away
            </span>
          )}
      </span>
    </p>
  </div>
)

Hit.propTypes = {
  hit: PropTypes.object.isRequired
}

export default Hit
