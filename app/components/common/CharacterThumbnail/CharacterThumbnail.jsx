import React from 'react';
let {Component} = React;
import {Link} from 'react-router';
import Col from 'react-bootstrap/lib/Col';
import {Thumbnail} from 'react-bootstrap';
import "./CharacterThumbnail.css";

import tombstoneTransparent from '../../public/Characters/rip_tombstone_transparent.png';
import tombstone from '../../public/Characters/rip_tombstone.png';

import characterPlaceholderMale from '../../public/Characters/placeholder-male.png';
import characterPlaceholderFemale from '../../public/Characters/placeholder-female.png';

export default class CharacterThumbnail extends Component {

    render() {
      var img = (this.props.imageUrl != 'placeholder-male' && this.props.imageUrl != 'placeholder-female') 
                ? process.env.__PROTOCOL__ + process.env.__API__ + this.props.imageUrl : 
                (this.props.imageUrl == 'placeholder-male' ? characterPlaceholderMale : characterPlaceholderFemale);

      var detailLink = '/characters/'+encodeURIComponent(this.props.name);

      return (
          <Col md={3} xs={6}>
            <Link className="to-transition" to={detailLink}>
              <Thumbnail src={img} className="character-thumbnail" >
                  <p>{this.props.name}</p>
              </Thumbnail>
              <div className="characters-list-plod">
                <img src={tombstoneTransparent} />
                <div className="plod-percentage-cropper" style={{'height': this.props.plodCropperSize+'px'}}><img src={tombstone} /></div>
                <div className="plod-percentage">{this.props.plod}</div>
              </div>
            </Link>
          </Col>
        );
    }
}

CharacterThumbnail.propTypes = { 
  imageUrl: React.PropTypes.string, 
  name: React.PropTypes.string.isRequired, 
  plod: React.PropTypes.string, 
  plodCropperSize: React.PropTypes.number
};
CharacterThumbnail.defaultProps = { imageUrl: characterPlaceholderMale };
