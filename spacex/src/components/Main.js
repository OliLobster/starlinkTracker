import React, {Component} from 'react';
import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import { NEARBY_SATELLITE, STARLINK_CATEGORY, SAT_API_KEY } from '../constant';
import Axios from 'axios';
fdsafd
class Main extends Component {
    constructor(){
        super();
        this.state = {
        }
      }
  
    render() {
        return (
            <div className='main'>
                <div className="left-side">
                    <SatSetting />
                    <SatelliteList />
                </div>
                <div className="right-side">
                    right
                </div>
            </div>
        );
    }
}
export default Main;
