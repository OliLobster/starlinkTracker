import React, {Component} from 'react';
import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import WorldMap from './WorldMap';
import { NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY } from '../constant';
import Axios from 'axios';

class Main extends Component {
    constructor(){
        super();
        this.state = {
            loadingSatellites: false,
            selected: [],
        }
      }

      trackOnClick = () => {
        console.log(`tracking ${this.state.selected}`);
      }
      
      addOrRemove = (item, status) => {
        let { selected: list } = this.state;
        const found = list.some( entry => entry.satid === item.satid);
  
        if(status && !found){
            list.push(item)
        }
  
        if(!status && found){
            list = list.filter( entry => {
                return entry.satid !== item.satid;
            });
        }
        
        console.log(list);
        this.setState({
          selected: list
        })
      }

      showNearbySatellite = (setting) => {
        this.fetchSatellite(setting);
      }
  
      fetchSatellite = (setting) => {
        const {observerLat, observerLong, observerAlt, radius} = setting;
        const url = `${NEARBY_SATELLITE}/${observerLat}/${observerLong}/${observerAlt}/${radius}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
        
        this.setState({
            loadingSatellites: true,
          })

        Axios.get(url)
            .then(response => {
                this.setState({
                    satInfo: response.data,
                    loadingSatellites: false,
                })
            })
            .catch(error => {
                console.log('err in fetch satellite -> ', error);
                this.setState({
                    loadingSatellites: false,
                    selected: [],
                })    
            })
      }  
  
    render() {
        return (
            <div className='main'>
                <div className="left-side">
                    <SatSetting onShow={this.showNearbySatellite} />
                    <SatelliteList satInfo={this.state.satInfo} />
                    loading={this.state.loadingSatellites} 
                    onSelectionChange={this.addOrRemove}
                    disableTrack={this.state.selected.length === 0}
                    trackOnclick={this.trackOnClick}
                </div>
                <div className="right-side">
                    <WorldMap />
                </div>
            </div>
        );
    }
}
export default Main;
