import React from 'react';
let {Component} = React;

import {Link} from 'react-router';

export default class PlodTop5 extends Component {
  getHardcodedPlodTop5() {
    return [
      {
        name: 'Tommen Baratheon',
        plod: '97.9'
      }, {
        name: 'Stannis Baratheon',
        plod: '96.4'
      }, {
        name: 'Daenerys Targaryen',
        plod: '95.3'
      }, {
        name: 'Davos Seaworth',
        plod: '91.8'
      }, {
        name: 'Petyr Baelish',
        plod: '91.8'
      }
    ];
  }

  render() {
    return (<div>
      <h2 className="text-center ranking-title">Who is most likely to die next</h2>
      <table>
        {
          this.getHardcodedPlodTop5().map((char) => {
              return <tr key={char.name}>
              <td>
                <h4>
                  <Link to={'/characters/' + char.name}>
                    {char.name}
                    
                  </Link>
                </h4>
              </td>
              <td><h4>{parseInt(char.plod)}%</h4></td>
            </tr>;
          })
        }
      </table>
      <p className="see-more">
        <Link to={'/characters/?search=&page=1&sort=plod&order=-1'}>See more</Link>
      </p>
    </div>);
  }
}
