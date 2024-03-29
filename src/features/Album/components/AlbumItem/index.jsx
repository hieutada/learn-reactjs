import React from "react";
import PropTypes from "prop-types";
import './style.scss'

AlbumItem.propTypes = {
  album: PropTypes.object.isRequired,
};

function AlbumItem({ album }) {
  return (
    <div className="album">
      <div className="album-thumbnail">
        <img src={album.thumbnailUrl} alt={album.name} />
      </div>
      <p className="album-name">{album.name}</p>
    </div>
  );
}

export default AlbumItem;
