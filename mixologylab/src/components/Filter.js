/**
 * Created by eddiemac on 5/26/2017.
 * Edited by samguerrero on 5/31/2017.
  - added state and state updating buttons
 * Edited by hafgan (Cliff Knopik) on 6/1/17
	- created get JSON file option and loop to populate list
 */
import React from 'react'
import './Filter.css'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class FilterPage extends React.Component{

    static propTypes = {
      updateTaste: PropTypes.func,
      baseAlcohol: PropTypes.string,
      baseAlcoholAPIReturn: PropTypes.object,
      //tasteFilter: PropTypes.array
      drinksLists: PropTypes.array,
    };

    constructor () {
      super()
      this.routeWithNewTaste = this.routeWithNewTaste.bind(this)
    }

    routeWithNewTaste (e) {
      e.preventDefault()
      this.props.updateTaste(e.target.value)
      //this.props.history.push(`/drink-menu`)
    }

    render(){

    const { tasteFilter, drinksLists } = this.props

    const selectedBaseAlcohol = this.props.baseAlcohol
    const selectedBaseAlcoholCount = this.props.baseAlcoholAPIReturn.totalResult

		// Get the overall object from the JSON file - Cliff Knopik 6/1/17
		const tastesObject = require('../data/tastes.json');

		// log to show there is an array of objects - Cliff Knopik 6/1/17
		//console.log("Tastes:");
		//console.log(tastesObject.result);

		// Assign the results - the array of tastes objects - Cliff Knopik 6/1/17
		const tasteFilterStrings = tastesObject.result;

        const tasteFilterList = tasteFilterStrings.map(item => {
          return <button
            type='submit'
            name={item.name}
            key={item.name}
            value={item.id}
            className={tasteFilter.includes(item.id) ? item.id + 'clicked' : item.id}
            onClick={this.routeWithNewTaste}>{item.name}
          </button>
        })

        return(
            <div>
                <h1>Taste</h1>
                <p>Selected Base Alcohol: {selectedBaseAlcohol.toUpperCase()}</p>
                <p>Amount in category: {drinksLists.length !== 0 ? drinksLists.length : 0}</p>
                <ul>
                  {selectedBaseAlcohol !== 'LOADING...' ? tasteFilterList : <p></p>}
                </ul>
            </div>
        )


    }

}

export default withRouter(FilterPage)
