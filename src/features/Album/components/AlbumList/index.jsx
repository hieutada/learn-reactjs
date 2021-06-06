import React from "react";
import PropTypes from "prop-types";
import AlbumItem from "../AlbumItem";
import "./style.scss";

AlbumList.propTypes = {
  albumList: PropTypes.array.isRequired,
};

function AlbumList({ albumList }) {
  return (
    <ul className="album-list">
      {albumList.map((album) => (
        <li key={albumList.id}>
          <AlbumItem album={album} />
        </li>
      ))}
    </ul>
  );
}

export default AlbumList;
