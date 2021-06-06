import React from "react";
import AlbumList from "./components/AlbumList";

AlbumFearture.propTypes = {};

function AlbumFearture(props) {
  const albumList = [
    {
      id: 1,
      name: "Pop Việt Ngày Nay",
      thumbnailUrl:
        "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/4/6/0/d/460d981f7298e5b9dd8099b6bc3e06da.jpg",
    },
    {
      id: 2,
      name: "V-Pop Mới Nổi Bật",
      thumbnailUrl:
        "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/7/9/e/8/79e8ee6cf0e8a2585ab510d4dd9a33e0.jpg",
    },
    {
      id: 3,
      name: "Pop Ballad Việt",
      thumbnailUrl:
        "https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/f/7/4/5/f7452c4bab07a4cfd39c388e73a13922.jpg",
    },
  ];
  return (
    <div>
      <h3>Có thể bạn sẽ thích</h3>
      <AlbumList albumList={albumList} />
    </div>
  );
}

export default AlbumFearture;
